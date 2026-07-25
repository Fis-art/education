import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('news_categories').del()
  await knex('news_categories').insert([
    { id: '66666666-6666-6666-6666-666666666661', name: 'Pengumuman', slug: 'pengumuman', description: 'Pengumuman resmi sekolah', color: '#EF4444', is_active: true },
    { id: '66666666-6666-6666-6666-666666666662', name: 'Prestasi', slug: 'prestasi', description: 'Prestasi siswa dan guru', color: '#F59E0B', is_active: true },
    { id: '66666666-6666-6666-6666-666666666663', name: 'Kegiatan', slug: 'kegiatan', description: 'Kegiatan sekolah', color: '#3B82F6', is_active: true },
    { id: '66666666-6666-6666-6666-666666666664', name: 'PPDB', slug: 'ppdb', description: 'Informasi PPDB', color: '#10B981', is_active: true },
    { id: '66666666-6666-6666-6666-666666666665', name: 'Umum', slug: 'umum', description: 'Berita umum', color: '#6B7280', is_active: true },
  ])
}