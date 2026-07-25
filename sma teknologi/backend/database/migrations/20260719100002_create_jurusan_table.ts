import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('jurusan', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('kode', 10).notNullable().unique()
    table.string('nama', 150).notNullable()
    table.string('singkatan', 20).nullable()
    table.text('deskripsi').nullable()
    table.json('visi_misi').nullable()
    table.text('kompetensi_keahlian').nullable()
    table.text('kurikulum').nullable()
    table.text('prospek_karir').nullable()
    table.string('foto_header', 500).nullable()
    table.uuid('guru_koordinator_id').nullable()
    table.integer('urutan').notNullable().defaultTo(0)
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('guru_koordinator_id').references('id').inTable('guru').onUpdate('CASCADE').onDelete('SET NULL')
    table.index('is_active')
    table.index('urutan')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('jurusan')
}