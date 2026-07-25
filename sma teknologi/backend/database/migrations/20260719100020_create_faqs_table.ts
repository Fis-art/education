import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('faqs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('category', 100).notNullable()
    table.text('question').notNullable()
    table.longtext('answer').notNullable()
    table.integer('order').notNullable().defaultTo(0)
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.index('category')
    table.index('order')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('faqs')
}