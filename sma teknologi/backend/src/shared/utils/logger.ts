import winston from 'winston'
import path from 'path'
import { config } from '../../config/env'

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`
    if (Object.keys(meta).length > 0) log += ` ${JSON.stringify(meta)}`
    if (stack) log += `\n${stack}`
    return log
  })
)

export const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    }),
    new winston.transports.File({
      filename: config.LOG_FILE,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
})

export const createModuleLogger = (module: string) => {
  return {
    info: (message: string, meta?: any) => logger.info(`[${module}] ${message}`, meta),
    warn: (message: string, meta?: any) => logger.warn(`[${module}] ${message}`, meta),
    error: (message: string, meta?: any) => logger.error(`[${module}] ${message}`, meta),
    debug: (message: string, meta?: any) => logger.debug(`[${module}] ${message}`, meta),
  }
}