import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { uploadService } from './upload.service'
import { uploadImageSchema, uploadImagesSchema, uploadFileSchema } from './upload.validator'
import { ValidationError } from '@shared/errors'

const storage = multer.memoryStorage()

const imageFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new ValidationError([{ field: 'file', message: 'Format gambar tidak didukung' }]))
  }
}

const documentFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
  ]
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new ValidationError([{ field: 'file', message: 'Format dokumen tidak didukung' }]))
  }
}

export const uploadSingleImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('file')

export const uploadMultipleImages = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
}).array('files', 10)

export const uploadSingleFile = multer({
  storage,
  fileFilter: documentFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('file')

export class UploadController {
  async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      uploadSingleImage(req, res, async (err) => {
        if (err) {
          return next(err)
        }

        if (!req.file) {
          return next(new ValidationError([{ field: 'file', message: 'File tidak ditemukan' }]))
        }

        const folder = (req.body.folder as any) || 'general'
        const result = await uploadService.processImage(req.file, { folder })

        res.json({
          success: true,
          message: 'Gambar berhasil diunggah',
          data: result,
        })
      })
    } catch (error) {
      next(error)
    }
  }

  async uploadImages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      uploadMultipleImages(req, res, async (err) => {
        if (err) {
          return next(err)
        }

        if (!req.files || req.files.length === 0) {
          return next(new ValidationError([{ field: 'files', message: 'File tidak ditemukan' }]))
        }

        const folder = (req.body.folder as any) || 'galeri'
        const results = await uploadService.processImages(req.files as Express.Multer.File[], { folder })

        res.json({
          success: true,
          message: `${results.length} gambar berhasil diunggah`,
          data: results,
        })
      })
    } catch (error) {
      next(error)
    }
  }

  async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      uploadSingleFile(req, res, async (err) => {
        if (err) {
          return next(err)
        }

        if (!req.file) {
          return next(new ValidationError([{ field: 'file', message: 'File tidak ditemukan' }]))
        }

        const folder = (req.body.folder as any) || 'download'
        const result = await uploadService.processDocument(req.file, { folder })

        res.json({
          success: true,
          message: 'File berhasil diunggah',
          data: result,
        })
      })
    } catch (error) {
      next(error)
    }
  }
}

export const uploadController = new UploadController()