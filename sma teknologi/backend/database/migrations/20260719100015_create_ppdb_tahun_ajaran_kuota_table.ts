import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ppdb_tahun_ajaran_kuota', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('tahun_ajaran_id').notNullable()
    table.uuid('jurusan_id').notNullable()
    table.integer('kuota_zonasi').notNullable().defaultTo(0)
    table.integer('kuota_afirmasi').notNullable().defaultTo(0)
    table.integer('kuota_prestasi').notNullable().defaultTo(0)
    table.integer('kuota_perpindahan').notNullable().defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('tahun_ajaran_id').references('id').inTable('ppdb_tahun_ajaran').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('jurusan_id').references('id').inTable('jurusan').onUpdate('CASCADE').onDelete('CASCADE')
    table.unique(['tahun_ajaran_id', 'jurusan_id'])
    table.index('tahun_ajaran_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('ppdb_tahun_ajaran_kuota')
}