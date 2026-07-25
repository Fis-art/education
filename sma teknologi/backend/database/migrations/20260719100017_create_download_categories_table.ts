import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('download_categories', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('name', 100).notNullable().unique()
    table.string('slug', 120).notNullable().unique()
    table.text('description').nullable()
    table.string('icon', 50).nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.index('slug')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('download_categories')
}