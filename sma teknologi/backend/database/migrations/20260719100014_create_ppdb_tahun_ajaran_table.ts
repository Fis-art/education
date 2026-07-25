import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ppdb_tahun_ajaran', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('tahun_ajaran', 20).notNullable().unique()
    table.integer('gelombang').notNullable().defaultTo(1)
    table.integer('kuota_total').notNullable().defaultTo(0)
    table.date('tanggal_buka').notNullable()
    table.date('tanggal_tutup').notNullable()
    table.date('tanggal_pengumuman').nullable()
    table.longtext('syarat_ketentuan').nullable()
    table.json('form_fields').nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.index('is_active')
    table.index('tanggal_buka')
    table.index('tanggal_tutup')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('ppdb_tahun_ajaran')
}