import { Knex } from 'knex'
import bcrypt from 'bcryptjs'

export async function seed(knex: Knex): Promise<void> {
  const passwordHash = await bcrypt.hash('Admin123!', 12)

  const roleResult = await knex('roles').where('name', 'super_admin').first()
  if (!roleResult) return

  const userExists = await knex('users').where('email', 'superadmin@smktekplus.sch.id').first()
  if (!userExists) {
    await knex('users').insert({
      id: '55555555-6666-7777-8888-999999999991',
      role_id: roleResult.id,
      name: 'Super Admin',
      email: 'superadmin@smktekplus.sch.id',
      username: 'superadmin',
      password_hash: passwordHash,
      is_active: true,
      email_verified_at: knex.fn.now(),
    })
  }

  const settingsExist = await knex('settings').where('setting_key', 'school_name').first()
  if (!settingsExist) {
    await knex('settings').insert([
      { id: '44444444-5555-6666-7777-888888888881', setting_key: 'school_name', setting_group: 'identity', setting_type: 'string', value: 'SMK Teknologi Plus', label: 'Nama Sekolah', is_public: true, order: 1 },
      { id: '44444444-5555-6666-7777-888888888882', setting_key: 'school_short_name', setting_group: 'identity', setting_type: 'string', value: 'SMK TekPlus', label: 'Nama Singkat', is_public: true, order: 2 },
      { id: '44444444-5555-6666-7777-888888888883', setting_key: 'npsn', setting_group: 'identity', setting_type: 'string', value: '12345678', label: 'NPSN', is_public: true, order: 3 },
      { id: '44444444-5555-6666-7777-888888888884', setting_key: 'address', setting_group: 'identity', setting_type: 'text', value: 'Jl. Contoh No. 123, Kel. Contoh, Kec. Contoh, Kota Contoh, Provinsi', label: 'Alamat Lengkap', is_public: true, order: 4 },
      { id: '44444444-5555-6666-7777-888888888885', setting_key: 'phone', setting_group: 'identity', setting_type: 'string', value: '021-1234567', label: 'Telepon', is_public: true, order: 5 },
      { id: '44444444-5555-6666-7777-888888888886', setting_key: 'email', setting_group: 'identity', setting_type: 'string', value: 'info@smktekplus.sch.id', label: 'Email', is_public: true, order: 6 },
      { id: '44444444-5555-6666-7777-888888888887', setting_key: 'website', setting_group: 'identity', setting_type: 'string', value: 'https://smktekplus.sch.id', label: 'Website', is_public: true, order: 7 },
      { id: '44444444-5555-6666-7777-888888888888', setting_key: 'meta_title', setting_group: 'seo', setting_type: 'string', value: 'SMK Teknologi Plus - Sekolah Menengah Kejuruan Terdepan', label: 'Meta Title', is_public: true, order: 20 },
      { id: '44444444-5555-6666-7777-888888888888', setting_key: 'meta_description', setting_group: 'seo', setting_type: 'text', value: 'Website resmi SMK Teknologi Plus. Profil, jurusan, guru, prestasi, PPDB, berita, dan informasi sekolah.', label: 'Meta Description', is_public: true, order: 21 },
      { id: '44444444-5555-6666-7777-888888888889', setting_key: 'copyright_text', setting_group: 'footer', setting_type: 'string', value: '© 2025 SMK Teknologi Plus. All rights reserved.', label: 'Copyright Text', is_public: true, order: 30 },
      { id: '44444444-5555-6666-7777-888888888890', setting_key: 'maintenance_mode', setting_group: 'maintenance', setting_type: 'boolean', value: 'false', label: 'Maintenance Mode', is_public: false, order: 40 },
    ])
  }
}