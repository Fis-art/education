import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('downloads', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('uploader_id').notNullable()
    table.uuid('category_id').nullable()
    table.string('title', 255).notNullable()
    table.text('description').nullable()
    table.string('file_url', 500).notNullable()
    table.string('file_name', 255).notNullable()
    table.bigint('file_size').notNullable()
    table.string('file_type', 100).notNullable()
    table.integer('download_count').notNullable().defaultTo(0)
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('uploader_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('category_id').references('id').inTable('download_categories').onUpdate('CASCADE').onDelete('SET NULL')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('downloads')
}