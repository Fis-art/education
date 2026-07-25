import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs/promises'
import { config } from '@config/env'
import {
  ProcessedImage,
  UploadedFileResult,
  UploadOptions,
  ALLOWED_IMAGE_MIMES,
  ALLOWED_DOCUMENT_MIMES,
  IMAGE_MAX_SIZE,
  DOCUMENT_MAX_SIZE,
  IMAGE_VARIANTS,
} from './upload.types'
import { ValidationError, UnprocessableError } from '@shared/errors'

export class UploadService {
  private uploadPath: string

  constructor() {
    this.uploadPath = config.UPLOAD_PATH
    this.ensureUploadDirs()
  }

  private async ensureUploadDirs(): Promise<void> {
    const dirs = ['images', 'files', 'images/2026', 'files/2026']
    for (const dir of dirs) {
      const fullPath = path.join(this.uploadPath, dir)
      await fs.mkdir(fullPath, { recursive: true })
    }
  }

  private generateFilename(originalName: string, extension: string): string {
    const timestamp = Date.now()
    const uuid = uuidv4().slice(0, 8)
    const sanitized = originalName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .slice(0, 50)
    return `${timestamp}-${uuid}-${sanitized}.${extension}`
  }

  private getExtension(mimetype: string): string {
    const extensions: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'application/zip': 'zip',
    }
    return extensions[mimetype] || 'bin'
  }

  private validateImage(file: Express.Multer.File): void {
    if (!ALLOWED_IMAGE_MIMES.includes(file.mimetype as any)) {
      throw new ValidationError([{
        field: 'file',
        message: 'Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP',
      }])
    }
    if (file.size > IMAGE_MAX_SIZE) {
      throw new ValidationError([{
        field: 'file',
        message: `Ukuran gambar terlalu besar. Maksimal ${IMAGE_MAX_SIZE / 1024 / 1024}MB`,
      }])
    }
  }

  private validateDocument(file: Express.Multer.File): void {
    if (!ALLOWED_DOCUMENT_MIMES.includes(file.mimetype as any)) {
      throw new ValidationError([{
        field: 'file',
        message: 'Format dokumen tidak didukung. Gunakan PDF, DOC, DOCX, XLS, XLSX, atau ZIP',
      }])
    }
    if (file.size > DOCUMENT_MAX_SIZE) {
      throw new ValidationError([{
        field: 'file',
        message: `Ukuran dokumen terlalu besar. Maksimal ${DOCUMENT_MAX_SIZE / 1024 / 1024}MB`,
      }])
    }
  }

  async processImage(file: Express.Multer.File, options: UploadOptions): Promise<ProcessedImage> {
    this.validateImage(file)

    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const baseDir = path.join(this.uploadPath, 'images', String(year), month)
    await fs.mkdir(baseDir, { recursive: true })

    const filename = this.generateFilename(file.originalname, 'webp')
    const originalPath = path.join(baseDir, filename)
    const thumbnailPath = path.join(baseDir, `thumb_${filename}`)
    const mediumPath = path.join(baseDir, `med_${filename}`)

    const metadata = await sharp(file.buffer).metadata()
    const { width, height } = metadata

    await sharp(file.buffer)
      .resize(IMAGE_VARIANTS.original.width, null, { withoutEnlargement: true })
      .webp({ quality: IMAGE_VARIANTS.original.quality })
      .toFile(originalPath)

    await sharp(file.buffer)
      .resize(IMAGE_VARIANTS.thumbnail.width, null, { withoutEnlargement: true })
      .webp({ quality: IMAGE_VARIANTS.thumbnail.quality })
      .toFile(thumbnailPath)

    await sharp(file.buffer)
      .resize(IMAGE_VARIANTS.medium.width, null, { withoutEnlargement: true })
      .webp({ quality: IMAGE_VARIANTS.medium.quality })
      .toFile(mediumPath)

    const stats = await fs.stat(originalPath)

    return {
      original: `/uploads/images/${year}/${month}/${filename}`,
      thumbnail: `/uploads/images/${year}/${month}/thumb_${filename}`,
      medium: `/uploads/images/${year}/${month}/med_${filename}`,
      width,
      height,
      size: stats.size,
      mime: 'image/webp',
    }
  }

  async processImages(files: Express.Multer.File[], options: UploadOptions): Promise<ProcessedImage[]> {
    const results: ProcessedImage[] = []
    for (const file of files) {
      const processed = await this.processImage(file, options)
      results.push(processed)
    }
    return results
  }

  async processDocument(file: Express.Multer.File, options: UploadOptions): Promise<UploadedFileResult> {
    this.validateDocument(file)

    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const baseDir = path.join(this.uploadPath, 'files', String(year), month)
    await fs.mkdir(baseDir, { recursive: true })

    const extension = this.getExtension(file.mimetype)
    const filename = this.generateFilename(file.originalname, extension)
    const filePath = path.join(baseDir, filename)

    await fs.writeFile(filePath, file.buffer)
    const stats = await fs.stat(filePath)

    return {
      url: `/uploads/files/${year}/${month}/${filename}`,
      filename: file.originalname,
      size: stats.size,
      mime: file.mimetype,
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const relativePath = fileUrl.replace('/uploads/', '')
      const fullPath = path.join(this.uploadPath, relativePath)
      await fs.unlink(fullPath)

      if (fileUrl.includes('/images/')) {
        const thumbPath = fullPath.replace(/\/([^/]+)$/, '/thumb_$1')
        const medPath = fullPath.replace(/\/([^/]+)$/, '/med_$1')
        await fs.unlink(thumbPath).catch(() => {})
        await fs.unlink(medPath).catch(() => {})
      }
    } catch {
      // Ignore delete errors
    }
  }

  getPublicUrl(fileUrl: string): string {
    return `${config.APP_URL}${fileUrl}`
  }
}

export const uploadService = new UploadService()