import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ekstrakurikuler', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('nama', 150).notNullable()
    table.uuid('pembina_id').nullable()
    table.text('deskripsi').nullable()
    table.string('jam_pelaksanaan', 100).nullable()
    table.string('foto', 500).nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('pembina_id').references('id').inTable('guru').onUpdate('CASCADE').onDelete('SET NULL')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('ekstrakurikuler')
}