import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('berita', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('category_id').notNullable()
    table.uuid('author_id').notNullable()
    table.string('title', 255).notNullable()
    table.string('slug', 280).notNullable().unique()
    table.text('excerpt').nullable()
    table.longtext('content').notNullable()
    table.string('thumbnail', 500).nullable()
    table.json('tags').nullable()
    table.json('meta_seo').nullable()
    table.enum('status', ['draft', 'published', 'archived']).notNullable().defaultTo('draft')
    table.timestamp('published_at').nullable()
    table.integer('view_count').notNullable().defaultTo(0)
    table.boolean('is_featured').notNullable().defaultTo(false)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('category_id').references('id').inTable('news_categories').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('author_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.index('slug')
    table.index('category_id')
    table.index('status')
    table.index('published_at')
    table.index('author_id')
    table.index('is_featured')
    table.index('deleted_at')
    table.fulltext(['title', 'excerpt', 'content'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('berita')
}