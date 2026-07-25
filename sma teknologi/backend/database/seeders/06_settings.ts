import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('settings').del()
  await knex('settings').insert([
    { id: '44444444-5555-6666-7777-888888888881', setting_key: 'school_name', setting_group: 'identity', setting_type: 'string', value: 'SMK Teknologi Plus', label: 'Nama Sekolah', is_public: true, order: 1 },
    { id: '44444444-5555-6666-7777-888888888882', setting_key: 'school_short_name', setting_group: 'identity', setting_type: 'string', value: 'SMK TekPlus', label: 'Nama Singkat', is_public: true, order: 2 },
    { id: '44444444-5555-6666-7777-888888888883', setting_key: 'npsn', setting_group: 'identity', setting_type: 'string', value: '12345678', label: 'NPSN', is_public: true, order: 3 },
    { id: '44444444-5555-6666-7777-888888888884', setting_key: 'nsm', setting_group: 'identity', setting_type: 'string', value: '87654321', label: 'NSM', is_public: true, order: 4 },
    { id: '44444444-5555-6666-7777-888888888885', setting_key: 'address', setting_group: 'identity', setting_type: 'text', value: 'Jl. Contoh No. 123, Kel. Contoh, Kec. Contoh, Kota Contoh, Provinsi', label: 'Alamat Lengkap', is_public: true, order: 5 },
    { id: '44444444-5555-6666-7777-888888888886', setting_key: 'phone', setting_group: 'identity', setting_type: 'string', value: '021-1234567', label: 'Telepon', is_public: true, order: 6 },
    { id: '44444444-5555-6666-7777-888888888887', setting_key: 'email', setting_group: 'identity', setting_type: 'string', value: 'info@smktekplus.sch.id', label: 'Email', is_public: true, order: 7 },
    { id: '44444444-5555-6666-7777-888888888888', setting_key: 'website', setting_group: 'identity', setting_type: 'string', value: 'https://smktekplus.sch.id', label: 'Website', is_public: true, order: 8 },
    { id: '44444444-5555-6666-7777-888888888889', setting_key: 'logo', setting_group: 'identity', setting_type: 'file', value: '/uploads/logo.png', label: 'Logo Sekolah', is_public: true, order: 9 },
    { id: '44444444-5555-6666-7777-888888888890', setting_key: 'favicon', setting_group: 'identity', setting_type: 'file', value: '/uploads/favicon.ico', label: 'Favicon', is_public: true, order: 10 },
    { id: '44444444-5555-6666-7777-888888888891', setting_key: 'facebook', setting_group: 'social', setting_type: 'string', value: 'https://facebook.com/smktekplus', label: 'Facebook', is_public: true, order: 10 },
    { id: '44444444-5555-6666-7777-888888888892', setting_key: 'instagram', setting_group: 'social', setting_type: 'string', value: 'https://instagram.com/smktekplus', label: 'Instagram', is_public: true, order: 11 },
    { id: '44444444-5555-6666-7777-888888888893', setting_key: 'youtube', setting_group: 'social', setting_type: 'string', value: 'https://youtube.com/@smktekplus', label: 'YouTube', is_public: true, order: 12 },
    { id: '44444444-5555-6666-7777-888888888894', setting_key: 'tiktok', setting_group: 'social', setting_type: 'string', value: 'https://tiktok.com/@smktekplus', label: 'TikTok', is_public: true, order: 13 },
    { id: '44444444-5555-6666-7777-888888888895', setting_key: 'twitter', setting_group: 'social', setting_type: 'string', value: 'https://twitter.com/smktekplus', label: 'Twitter/X', is_public: true, order: 14 },
    { id: '44444444-5555-6666-7777-888888888896', setting_key: 'whatsapp', setting_group: 'social', setting_type: 'string', value: 'https://wa.me/6281234567890', label: 'WhatsApp', is_public: true, order: 15 },
    { id: '44444444-5555-6666-7777-888888888897', setting_key: 'meta_title', setting_group: 'seo', setting_type: 'string', value: 'SMK Teknologi Plus - Sekolah Menengah Kejuruan Terdepan', label: 'Meta Title', is_public: true, order: 20 },
    { id: '44444444-5555-6666-7777-888888888898', setting_key: 'meta_description', setting_group: 'seo', setting_type: 'text', value: 'Website resmi SMK Teknologi Plus. Profil, jurusan, guru, prestasi, PPDB, berita, dan informasi sekolah.', label: 'Meta Description', is_public: true, order: 21 },
    { id: '44444444-5555-6666-7777-888888888899', setting_key: 'meta_keywords', setting_group: 'seo', setting_type: 'string', value: 'SMK Teknologi Plus, sekolah menengah kejuruan, PPDB, jurusan TKJ RPL TKR MM', label: 'Meta Keywords', is_public: true, order: 22 },
    { id: '44444444-5555-6666-7777-888888888900', setting_key: 'og_image_default', setting_group: 'seo', setting_type: 'file', value: '/uploads/og-default.jpg', label: 'Default OG Image', is_public: true, order: 23 },
    { id: '44444444-5555-6666-7777-888888888901', setting_key: 'google_analytics_id', setting_group: 'seo', setting_type: 'string', value: '', label: 'Google Analytics ID', is_public: false, order: 24 },
    { id: '44444444-5555-6666-7777-888888888902', setting_key: 'search_console_code', setting_group: 'seo', setting_type: 'string', value: '', label: 'Search Console Verification', is_public: false, order: 25 },
    { id: '44444444-5555-6666-7777-888888888903', setting_key: 'copyright_text', setting_group: 'footer', setting_type: 'string', value: '© 2025 SMK Teknologi Plus. All rights reserved.', label: 'Copyright Text', is_public: true, order: 30 },
    { id: '44444444-5555-6666-7777-888888888904', setting_key: 'maintenance_mode', setting_group: 'maintenance', setting_type: 'boolean', value: 'false', label: 'Maintenance Mode', is_public: false, order: 40 },
    { id: '44444444-5555-6666-7777-888888888905', setting_key: 'maintenance_message', setting_group: 'maintenance', setting_type: 'text', value: 'Website sedang dalam pemeliharaan. Silakan coba lagi nanti.', label: 'Maintenance Message', is_public: false, order: 41 },
  ])
}