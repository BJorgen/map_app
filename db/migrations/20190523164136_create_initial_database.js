
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

  //TODO map_settings should reference map and not the other way around
  .createTable('map_settings', function (table) {
    table.increments('id').primary()
    table.decimal('center_long',9,6).notNullable()
    table.decimal('center_lat',9,6).notNullable()
    table.decimal('zoom')
  })
  .createTable('maps', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.boolean('public')
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('map_setting_id')
    table.foreign('map_setting_id').references('map_settings.id').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  .createTable('points', function (table) {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.string('description', 255)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.decimal('longitude',9,6).notNullable()
    table.decimal('latitude',9,6).notNullable()
    table.integer('map_id')
    table.foreign('map_id').references('maps.id').onDelete('CASCADE')
  })
  .createTable('images', function (table) {
    table.increments('id').primary()
    table.string('image_url', 255)
    table.integer('point_id')
    table.foreign('point_id').references('points.id').onDelete('CASCADE')
  })
  .createTable('favourites', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('map_id')
    table.foreign('map_id').references('maps.id').onDelete('CASCADE')
  })
  .createTable('contributors', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('map_id')
    table.foreign('map_id').references('maps.id').onDelete('CASCADE')
    table.timestamp('modified_at').defaultTo(knex.fn.now())

  })


};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('contributors')
  .dropTable('favourites')
  .dropTable('images')
  .dropTable('points')
  .dropTable('maps')
  .dropTable('map_settings')
  .dropTable('users')
};
