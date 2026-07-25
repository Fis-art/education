import { Role } from '../../../shared/types/auth'

export interface JWTPayload {
  sub: string
  email: string
  role: Role
  iat?: number
  exp?: number
  iss?: string
  aud?: string
}

export interface RefreshTokenPayload {
  sub: string
  tokenVersion: number
  iat?: number
  exp?: number
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: {
    id: string
    name: string
    email: string
    role: Role
    avatar: string | null
  }
  accessToken: string
  expiresIn: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  username: string | null
  role: Role
  avatar: string | null
  phone: string | null
  lastLoginAt: string | null
  permissions: string[]
}