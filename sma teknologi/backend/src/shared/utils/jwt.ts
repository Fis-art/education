import jwt from 'jsonwebtoken'
import { config } from '@config/env'
import { JWTPayload, RefreshTokenPayload } from '@modules/auth/auth.types'

const ACCESS_TOKEN_SECRET = config.JWT_SECRET
const REFRESH_TOKEN_SECRET = config.JWT_REFRESH_SECRET
const ACCESS_TOKEN_EXPIRY = config.JWT_ACCESS_EXPIRY
const REFRESH_TOKEN_EXPIRY = config.JWT_REFRESH_EXPIRY
const ALGORITHM = config.JWT_ALGORITHM as jwt.Algorithm
const ISSUER = config.JWT_ISSUER
const AUDIENCE = config.JWT_AUDIENCE

export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    algorithm: ALGORITHM,
    expiresIn: ACCESS_TOKEN_EXPIRY,
    issuer: ISSUER,
    audience: AUDIENCE,
  })
}

export function generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    algorithm: ALGORITHM,
    expiresIn: REFRESH_TOKEN_EXPIRY,
    issuer: ISSUER,
    audience: AUDIENCE,
  })
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET, {
    algorithms: [ALGORITHM],
    issuer: ISSUER,
    audience: AUDIENCE,
  }) as JWTPayload
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET, {
    algorithms: [ALGORITHM],
    issuer: ISSUER,
    audience: AUDIENCE,
  }) as RefreshTokenPayload
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload
  } catch {
    return null
  }
}

export function getTokenExpiry(token: string): number | null {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return null
  return decoded.exp * 1000 - Date.now()
}

export function isTokenExpired(token: string): boolean {
  const expiry = getTokenExpiry(token)
  return expiry !== null && expiry <= 0
}