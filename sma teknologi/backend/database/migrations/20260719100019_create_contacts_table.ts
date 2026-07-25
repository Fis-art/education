import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('contacts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('name', 150).notNullable()
    table.string('email', 150).notNullable()
    table.string('subject', 255).notNullable()
    table.text('message').notNullable()
    table.string('ip_address', 45).nullable()
    table.text('user_agent').nullable()
    table.boolean('is_read').notNullable().defaultTo(false)
    table.timestamp('replied_at').nullable()
    table.uuid('replied_by').nullable()
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.foreign('replied_by').references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL')
    table.index('is_read')
    table.index('created_at')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('contacts')
}