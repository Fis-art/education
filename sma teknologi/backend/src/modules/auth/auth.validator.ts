import { z } from 'zod'

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid').max(150),
    password: z.string().min(8, 'Password minimal 8 karakter').max(100),
    rememberMe: z.boolean().optional(),
  }),
})

export const refreshSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, 'Refresh token diperlukan'),
  }),
})

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Password saat ini wajib diisi'),
    newPassword: z.string().min(8, 'Password baru minimal 8 karakter').max(100),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  }),
})

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid').max(150),
  }),
})

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token wajib diisi'),
    newPassword: z.string().min(8, 'Password minimal 8 karakter').max(100),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  }),
})