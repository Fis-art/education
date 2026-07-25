import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('pengumuman', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('author_id').notNullable()
    table.string('title', 255).notNullable()
    table.longtext('content').notNullable()
    table.enum('priority', ['low', 'medium', 'high']).notNullable().defaultTo('medium')
    table.date('start_date').notNullable()
    table.date('end_date').nullable()
    table.boolean('is_pinned').notNullable().defaultTo(false)
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('author_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.index('start_date')
    table.index('end_date')
    table.index('priority')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('pengumuman')
}