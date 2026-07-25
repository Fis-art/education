import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('download_categories').del()
  await knex('download_categories').insert([
    { id: '88888888-8888-8888-8888-888888888881', name: 'Formulir', slug: 'formulir', description: 'Formulir pendaftaran dan administrasi', icon: 'file-text', is_active: true },
    { id: '88888888-8888-8888-8888-888888888882', name: 'Dokumen', slug: 'dokumen', description: 'Dokumen resmi sekolah', icon: 'folder', is_active: true },
    { id: '88888888-8888-8888-8888-888888888883', name: 'Kurikulum', slug: 'kurikulum', description: 'Dokumen kurikulum dan silabus', icon: 'book-open', is_active: true },
    { id: '88888888-8888-8888-8888-888888888884', name: 'Lainnya', slug: 'lainnya', description: 'File download lainnya', icon: 'download', is_active: true },
  ])
}