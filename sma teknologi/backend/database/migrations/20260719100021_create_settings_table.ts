import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('settings', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('setting_key', 100).notNullable().unique()
    table.string('setting_group', 50).notNullable()
    table.enum('setting_type', ['string', 'text', 'json', 'boolean', 'integer', 'file']).notNullable().defaultTo('string')
    table.longtext('value').nullable()
    table.string('label', 150).notNullable()
    table.text('description').nullable()
    table.boolean('is_public').notNullable().defaultTo(false)
    table.json('validation_rules').nullable()
    table.integer('order').notNullable().defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.index('setting_group')
    table.index('is_public')
    table.index('order')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('settings')
}