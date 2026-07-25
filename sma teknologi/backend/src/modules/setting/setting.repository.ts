import { getKnex } from '@shared/database/knex'
import { BaseRepository } from '@shared/database/base-repository'
import { Setting, SettingInput, SettingsGrouped } from './setting.types'
import { NotFoundError } from '@shared/errors'

export class SettingRepository extends BaseRepository<Setting> {
  constructor() {
    super('settings')
  }

  async findAllGrouped(isPublic?: boolean): Promise<SettingsGrouped> {
    let query = this.knex(this.tableName).orderBy('setting_group').orderBy('order')

    if (isPublic !== undefined) {
      query = query.where('is_public', isPublic)
    }

    const settings = await query as Setting[]

    const grouped: SettingsGrouped = {
      identity: [],
      social: [],
      seo: [],
      footer: [],
      email: [],
      maintenance: [],
    }

    for (const setting of settings) {
      if (grouped[setting.setting_group as keyof SettingsGrouped]) {
        grouped[setting.setting_group as keyof SettingsGrouped].push(setting)
      }
    }

    return grouped
  }

  async findByKey(key: string): Promise<Setting | null> {
    return this.knex(this.tableName)
      .where('setting_key', key)
      .first()
  }

  async findByGroup(group: string): Promise<Setting[]> {
    return this.knex(this.tableName)
      .where('setting_group', group)
      .orderBy('order')
  }

  async createSetting(data: SettingInput): Promise<Setting> {
    return this.create(data as any)
  }

  async updateSetting(key: string, value: string): Promise<Setting> {
    const setting = await this.findByKey(key)
    if (!setting) {
      throw new NotFoundError('Setting', key)
    }
    return this.update(setting.id, { value, updated_at: this.knex.fn.now() })
  }

  async bulkUpdate(updates: Array<{ key: string; value: string }>): Promise<void> {
    await this.knex.transaction(async (trx) => {
      for (const { key, value } of updates) {
        await trx(this.tableName)
          .where('setting_key', key)
          .update({ value, updated_at: trx.fn.now() })
      }
    })
  }

  async getPublicSettings(): Promise<Record<string, string>> {
    const settings = await this.knex(this.tableName)
      .where('is_public', true)
      .select('setting_key', 'value')

    const result: Record<string, string> = {}
    for (const setting of settings) {
      result[setting.setting_key] = setting.value || ''
    }
    return result
  }
}

export const settingRepository = new SettingRepository()