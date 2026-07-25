import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('activity_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('user_id').nullable()
    table.string('action', 100).notNullable()
    table.string('model_type', 100).nullable()
    table.uuid('model_id').nullable()
    table.json('old_values').nullable()
    table.json('new_values').nullable()
    table.string('ip_address', 45).nullable()
    table.text('user_agent').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL')
    table.index('user_id')
    table.index('model_type')
    table.index('model_id')
    table.index('action')
    table.index('created_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('activity_logs')
}