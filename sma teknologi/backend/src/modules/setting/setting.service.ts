import { settingRepository } from './setting.repository'
import { Setting, SettingInput, SettingsGrouped } from './setting.types'
import { NotFoundError } from '@shared/errors'

export class SettingService {
  async getAll(group?: string, isPublic?: boolean): Promise<SettingsGrouped | Setting[]> {
    if (group) {
      return settingRepository.findByGroup(group)
    }
    if (isPublic !== undefined) {
      return settingRepository.findAllGrouped(isPublic)
    }
    return settingRepository.findAllGrouped()
  }

  async getPublic(): Promise<Record<string, string>> {
    return settingRepository.getPublicSettings()
  }

  async getByKey(key: string): Promise<Setting> {
    const setting = await settingRepository.findByKey(key)
    if (!setting) {
      throw new NotFoundError('Setting', key)
    }
    return setting
  }

  async update(key: string, value: string): Promise<Setting> {
    return settingRepository.updateSetting(key, value)
  }

  async bulkUpdate(updates: Array<{ key: string; value: string }>): Promise<void> {
    await settingRepository.bulkUpdate(updates)
  }

  async create(data: SettingInput): Promise<Setting> {
    return settingRepository.createSetting(data)
  }
}

export const settingService = new SettingService()