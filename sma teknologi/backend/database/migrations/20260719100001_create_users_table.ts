import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('role_id').notNullable()
    table.string('name', 150).notNullable()
    table.string('email', 150).notNullable().unique()
    table.string('username', 50).nullable().unique()
    table.string('password_hash', 255).notNullable()
    table.string('avatar', 500).nullable()
    table.string('phone', 20).nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('last_login_at').nullable()
    table.timestamp('email_verified_at').nullable()
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('role_id').references('id').inTable('roles').onUpdate('CASCADE').onDelete('RESTRICT')
    table.index('role_id')
    table.index('email')
    table.index('is_active')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users')
}