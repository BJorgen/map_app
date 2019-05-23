
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function (table) {
    table.increments('id').primary()
    table.string('first_name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.string('email_address', 255).unique().notNullable()
    table.string('username', 255).notNullable()
    table.string('password', 255).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  .createTable('map_settings', function (table) {
    table.increments('id').primary()
    table.decimal('center_long',9,6)
    table.decimal('center_lat',9,6)
    table.decimal('zoom')
  })
  .createTable('maps', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.boolean('public')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('map_setting_id')
    table.foreign('map_setting_id').references('map_settings.id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  .createTable('points', function (table) {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.string('description', 255)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.decimal('longitude',9,6)
    table.decimal('latitude',9,6)
    table.integer('map_id')
    table.foreign('map_id').references('maps.id')
  })
  .createTable('images', function (table) {
    table.increments('id').primary()
    table.binary('image')
    table.integer('point_id')
    table.foreign('point_id').references('points.id')
  })
  .createTable('favourites', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('map_id')
    table.foreign('map_id').references('maps.id')
  })
  .createTable('contributors', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('map_id')
    table.foreign('map_id').references('maps.id')
    table.timestamp('modified_at').defaultTo(knex.fn.now())

  })


};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('users')
  .dropTable('map_settings')
  .dropTable('maps')
  .dropTable('points')
  .dropTable('images')
  .dropTable('favorites')
  .dropTable('contributors')
};
