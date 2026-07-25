import { Role } from '@shared/types/auth'

export interface User {
  id: string
  role_id: string
  name: string
  email: string
  username: string | null
  password_hash: string
  avatar: string | null
  phone: string | null
  is_active: boolean
  last_login_at: string | null
  email_verified_at: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface UserWithRole extends User {
  role_name: string
  role_display_name: string
}

export interface CreateUserInput {
  name: string
  email: string
  username?: string
  password: string
  role_id: string
  phone?: string
}

export interface UpdateUserInput {
  name?: string
  phone?: string
  is_active?: boolean
  role_id?: string
}

export interface ChangePasswordInput {
  current_password?: string
  new_password: string
}

export interface UserQueryParams {
  page: number
  limit: number
  search?: string
  role_id?: string
  is_active?: boolean
  sort_by: string
  sort_order: 'asc' | 'desc'
}

export interface PaginatedUsers {
  data: UserWithRole[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}