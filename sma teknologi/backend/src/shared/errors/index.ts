export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly code: string

  constructor(message: string, statusCode: number, code: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>

  constructor(errors: Array<{ field: string; message: string }>) {
    super('Validasi gagal', 400, 'VALIDATION_ERROR')
    this.errors = errors
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string | number) {
    const message = id ? `${resource} dengan ID ${id} tidak ditemukan` : `${resource} tidak ditemukan`
    super(message, 404, 'NOT_FOUND')
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Tidak terautentikasi') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Akses ditolak') {
    super(message, 403, 'FORBIDDEN')
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
  }
}

export class UnprocessableError extends AppError {
  constructor(message: string) {
    super(message, 422, 'UNPROCESSABLE_ENTITY')
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Terlalu banyak permintaan') {
    super(message, 429, 'TOO_MANY_REQUESTS')
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Terjadi kesalahan server internal') {
    super(message, 500, 'INTERNAL_SERVER_ERROR')
  }
}