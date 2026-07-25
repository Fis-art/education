import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter').max(150),
    email: z.string().email('Format email tidak valid').max(150),
    username: z.string().min(3, 'Username minimal 3 karakter').max(50).regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh huruf, angka, dan underscore').optional(),
    password: z.string().min(8, 'Password minimal 8 karakter').max(100),
    role_id: z.string().uuid('Role ID tidak valid'),
    phone: z.string().max(20).optional(),
  }),
})

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('User ID tidak valid'),
  }),
  body: z.object({
    name: z.string().min(2).max(150).optional(),
    phone: z.string().max(20).optional(),
    is_active: z.boolean().optional(),
    role_id: z.string().uuid().optional(),
  }),
})

export const changeUserPasswordSchema = z.object({
  params: z.object({
    id: z.string().uuid('User ID tidak valid'),
  }),
  body: z.object({
    current_password: z.string().min(1, 'Password saat ini wajib diisi').optional(),
    new_password: z.string().min(8, 'Password baru minimal 8 karakter').max(100),
    confirm_password: z.string().min(1, 'Konfirmasi password wajib diisi'),
  }).refine(data => data.new_password === data.confirm_password, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirm_password'],
  }),
})

export const userQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().optional(),
    role_id: z.string().uuid().optional(),
    is_active: z.coerce.boolean().optional(),
    sort_by: z.string().default('created_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
  }),
})