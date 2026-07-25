import { Request, Response, NextFunction } from 'express'
import { logger } from '@shared/utils/logger'
import {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  UnprocessableError,
  TooManyRequestsError,
  InternalServerError,
} from '@shared/errors'
import { ZodError } from 'zod'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ZodError) {
    const errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }))
    res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      success: false,
      message: err.message,
      errors: err.errors,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof ForbiddenError) {
    res.status(403).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof ConflictError) {
    res.status(409).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof UnprocessableError) {
    res.status(422).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof TooManyRequestsError) {
    res.status(429).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    })
    return
  }

  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  })

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Terjadi kesalahan server internal'
      : err.message,
    timestamp: new Date().toISOString(),
    path: req.path,
  })
}