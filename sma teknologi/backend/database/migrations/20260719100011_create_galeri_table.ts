import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('galeri', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('category_id').notNullable()
    table.uuid('uploader_id').notNullable()
    table.string('title', 255).notNullable()
    table.text('description').nullable()
    table.json('images').notNullable()
    table.date('event_date').nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('category_id').references('id').inTable('gallery_categories').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('uploader_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.index('category_id')
    table.index('event_date')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('galeri')
}