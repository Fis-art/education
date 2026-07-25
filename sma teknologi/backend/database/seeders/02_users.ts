import { Knex } from 'knex'
import bcrypt from 'bcryptjs'

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del()

  const passwordHash = await bcrypt.hash('Admin123!', 12)

  await knex('users').insert([
    {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      role_id: '11111111-1111-1111-1111-111111111111',
      name: 'Super Administrator',
      email: 'superadmin@smktekplus.sch.id',
      username: 'superadmin',
      password_hash: passwordHash,
      phone: '081234567890',
      is_active: true,
      email_verified_at: new Date(),
    },
    {
      id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      role_id: '22222222-2222-2222-2222-222222222222',
      name: 'Admin Sekolah',
      email: 'admin@smktekplus.sch.id',
      username: 'admin',
      password_hash: passwordHash,
      phone: '081234567891',
      is_active: true,
      email_verified_at: new Date(),
    },
    {
      id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
      role_id: '33333333-3333-3333-3333-333333333333',
      name: 'Editor Konten',
      email: 'editor@smktekplus.sch.id',
      username: 'editor',
      password_hash: passwordHash,
      phone: '081234567892',
      is_active: true,
      email_verified_at: new Date(),
    },
  ])
}