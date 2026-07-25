import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('guru', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('user_id').nullable().unique()
    table.string('nip_nik', 30).nullable().unique()
    table.string('nama', 150).notNullable()
    table.enum('jenis_kelamin', ['L', 'P']).notNullable()
    table.string('tempat_lahir', 100).nullable()
    table.date('tanggal_lahir').nullable()
    table.text('alamat').nullable()
    table.string('telepon', 20).nullable()
    table.string('email', 150).nullable()
    table.string('foto', 500).nullable()
    table.string('jabatan', 100).nullable()
    table.uuid('jurusan_id').nullable()
    table.enum('status', ['aktif', 'pensiun', 'mutasi', 'non_aktif']).notNullable().defaultTo('aktif')
    table.integer('urutan').notNullable().defaultTo(0)
    table.timestamp('deleted_at').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL')
    table.foreign('jurusan_id').references('id').inTable('jurusan').onUpdate('CASCADE').onDelete('SET NULL')
    table.index('jurusan_id')
    table.index('status')
    table.index('urutan')
    table.index('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('guru')
}