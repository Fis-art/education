import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('gallery_categories').del()
  await knex('gallery_categories').insert([
    { id: '77777777-7777-7777-7777-777777777771', name: 'Kegiatan Sekolah', slug: 'kegiatan', description: 'Foto kegiatan belajar mengajar dan acara', icon: 'calendar', is_active: true },
    { id: '77777777-7777-7777-7777-777777777772', name: 'Fasilitas', slug: 'fasilitas', description: 'Foto fasilitas sekolah', icon: 'building', is_active: true },
    { id: '77777777-7777-7777-7777-777777777773', name: 'Prestasi', slug: 'prestasi', description: 'Foto prestasi dan penghargaan', icon: 'award', is_active: true },
    { id: '77777777-7777-7777-7777-777777777774', name: 'Ekstrakurikuler', slug: 'ekstrakurikuler', description: 'Foto kegiatan ekstrakurikuler', icon: 'users', is_active: true },
    { id: '77777777-7777-7777-7777-777777777775', name: 'Lainnya', slug: 'lainnya', description: 'Foto lainnya', icon: 'image', is_active: true },
  ])
}