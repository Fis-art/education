import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('hero_slider', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.string('title', 255).notNullable()
    table.text('subtitle').nullable()
    table.string('image_desktop', 500).notNullable()
    table.string('image_mobile', 500).nullable()
    table.string('cta_text', 100).nullable()
    table.string('cta_link', 500).nullable()
    table.enum('position', ['left', 'center', 'right']).notNullable().defaultTo('center')
    table.tinyint('overlay_opacity').notNullable().defaultTo(40)
    table.integer('order').notNullable().defaultTo(0)
    table.date('start_date').nullable()
    table.date('end_date').nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.index('order')
    table.index('start_date')
    table.index('end_date')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('hero_slider')
}