exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('plants', plants => {
      plants.increments('plant_id')
      plants.string('name', 128).notNullable()
      plants.string('species', 128).notNullable()
      plants.text('watering_frequency').notNullable
      plants.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
