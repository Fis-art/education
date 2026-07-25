import { z } from 'zod'

export const getSettingsSchema = z.object({
  query: z.object({
    group: z.string().optional(),
    is_public: z.coerce.boolean().optional(),
  }),
})

export const updateSettingsSchema = z.object({
  body: z.record(z.unknown()),
})

export const settingParamSchema = z.object({
  params: z.object({
    key: z.string().min(1),
  }),
})