import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('roles').del()
  await knex('roles').insert([
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'super_admin',
      display_name: 'Super Admin',
      description: 'Full system access including user management',
      permissions: JSON.stringify(['*']),
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'admin',
      display_name: 'Admin',
      description: 'Content management and master data',
      permissions: JSON.stringify([
        'guru:read', 'guru:write', 'guru:delete',
        'jurusan:read', 'jurusan:write', 'jurusan:delete',
        'ekstrakurikuler:read', 'ekstrakurikuler:write', 'ekstrakurikuler:delete',
        'berita:read', 'berita:write', 'berita:delete', 'berita:publish',
        'pengumuman:read', 'pengumuman:write', 'pengumuman:delete',
        'agenda:read', 'agenda:write', 'agenda:delete',
        'prestasi:read', 'prestasi:write', 'prestasi:delete',
        'galeri:read', 'galeri:write', 'galeri:delete',
        'hero_slider:read', 'hero_slider:write', 'hero_slider:delete',
        'download:read', 'download:write', 'download:delete',
        'ppdb:read', 'ppdb:write', 'ppdb:verify',
        'setting:read', 'setting:write',
        'dashboard:read',
      ]),
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      name: 'editor',
      display_name: 'Editor',
      description: 'Create and manage own content',
      permissions: JSON.stringify([
        'berita:read', 'berita:write_own', 'berita:delete_own',
        'pengumuman:read', 'pengumuman:write_own', 'pengumuman:delete_own',
        'agenda:read', 'agenda:write_own', 'agenda:delete_own',
        'prestasi:read', 'prestasi:write_own', 'prestasi:delete_own',
        'galeri:read', 'galeri:write_own',
        'dashboard:read',
      ]),
    },
    {
      id: '44444444-4444-4444-4444-444444444444',
      name: 'viewer',
      display_name: 'Viewer',
      description: 'Read-only dashboard access',
      permissions: JSON.stringify(['dashboard:read']),
    },
  ])
}