import { z } from 'zod'

export const uploadImageSchema = z.object({
  body: z.object({
    folder: z.enum(['berita', 'galeri', 'hero', 'guru', 'ppdb', 'download', 'setting', 'general']).default('general'),
  }),
})

export const uploadImagesSchema = z.object({
  body: z.object({
    folder: z.enum(['berita', 'galeri', 'hero', 'guru', 'ppdb', 'download', 'setting', 'general']).default('galeri'),
  }),
})

export const uploadFileSchema = z.object({
  body: z.object({
    folder: z.enum(['download', 'general']).default('download'),
  }),
})