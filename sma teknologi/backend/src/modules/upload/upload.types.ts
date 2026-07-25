export interface UploadedFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

export interface ProcessedImage {
  original: string
  thumbnail: string
  medium: string
  width: number
  height: number
  size: number
  mime: string
}

export interface UploadedFileResult {
  url: string
  filename: string
  size: number
  mime: string
}

export interface UploadOptions {
  folder: 'berita' | 'galeri' | 'hero' | 'guru' | 'ppdb' | 'download' | 'setting' | 'general'
}

export const ALLOWED_IMAGE_MIMES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

export const ALLOWED_DOCUMENT_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
] as const

export const IMAGE_MAX_SIZE = 5 * 1024 * 1024 // 5MB
export const DOCUMENT_MAX_SIZE = 10 * 1024 * 1024 // 10MB

export const IMAGE_VARIANTS = {
  thumbnail: { width: 400, quality: 80 },
  medium: { width: 800, quality: 85 },
  original: { width: 1920, quality: 90 },
} as const