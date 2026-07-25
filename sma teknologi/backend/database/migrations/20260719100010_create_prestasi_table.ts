import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('prestasi', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('author_id').notNullable()
    table.string('title', 255).notNullable()
    table.enum('tingkat', ['sekolah', 'kabupaten', 'provinsi', 'nasional', 'internasional']).notNullable()
    table.enum('jenis', ['akademik', 'non_akademik', 'olahraga', 'seni', 'lainnya']).notNullable()
    table.year('tahun').notNullable()
    table.enum('juara', ['1', '2', '3', 'harapan_1', 'harapan_2', 'harapan_3', 'lainnya']).notNullable()
    table.text('description').nullable()
    table.string('image', 500).nullable()
    table.json('siswa_guru_terlibat').nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('author_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.index('tingkat')
    table.index('jenis')
    table.index('tahun')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('prestasi')
}