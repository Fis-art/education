import bcrypt from 'bcryptjs'
import { config } from '@config/env'

const BCRYPT_ROUNDS = config.BCRYPT_ROUNDS

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password minimal 8 karakter')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung minimal 1 huruf besar')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung minimal 1 huruf kecil')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung minimal 1 angka')
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password harus mengandung minimal 1 karakter khusus')
  }

  return { valid: errors.length === 0, errors }
}