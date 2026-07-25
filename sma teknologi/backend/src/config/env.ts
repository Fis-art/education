import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  API_PREFIX: z.string().default('/api/v1'),

  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_PORT: z.coerce.number().default(3306),
  DATABASE_USER: z.string().default('smk_user'),
  DATABASE_PASSWORD: z.string().default('smk_pass'),
  DATABASE_NAME: z.string().default('smk_tekplus'),
  DATABASE_SSL: z.coerce.boolean().default(false),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().default(0),

  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ALGORITHM: z.enum(['HS256', 'RS256']).default('HS256'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  JWT_ISSUER: z.string().default('smk-tekplus'),
  JWT_AUDIENCE: z.string().default('smk-tekplus-users'),

  UPLOAD_MAX_SIZE: z.coerce.number().default(10485760),
  UPLOAD_ALLOWED_MIMES: z.string().default('image/jpeg,image/png,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip'),
  UPLOAD_PATH: z.string().default('./uploads'),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM_NAME: z.string().default('SMK Teknologi Plus'),
  SMTP_FROM_EMAIL: z.string().email().optional(),

  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
  LOG_FILE: z.string().default('./logs/app.log'),
})

export const config = envSchema.parse(process.env)

export const loggerConfig = {
  level: config.LOG_LEVEL,
  file: config.LOG_FILE,
}