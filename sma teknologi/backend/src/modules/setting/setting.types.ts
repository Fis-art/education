export interface Setting {
  id: string
  setting_key: string
  setting_group: string
  setting_type: 'string' | 'text' | 'json' | 'boolean' | 'integer' | 'file'
  value: string | null
  label: string
  description: string | null
  is_public: boolean
  validation_rules: string | null
  order: number
  created_at: string
  updated_at: string
}

export interface SettingInput {
  setting_key: string
  setting_group: string
  setting_type: 'string' | 'text' | 'json' | 'boolean' | 'integer' | 'file'
  value: string | null
  label: string
  description: string | null
  is_public: boolean
  validation_rules: string | null
  order: number
}

export interface SettingsGrouped {
  identity: Setting[]
  social: Setting[]
  seo: Setting[]
  footer: Setting[]
  email: Setting[]
  maintenance: Setting[]
}