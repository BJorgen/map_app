
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('map_settings').del()
    .then(function () {
      // Inserts seed entries
      return knex('map_settings').insert([
        {id: 1000001, center_long: -114.0624, center_lat: 51.0879, zoom: 12},
        {id: 1000002, center_long: -114.0424, center_lat: 51.0779, zoom: 12},
        {id: 1000003, center_long: -114.0824, center_lat: 51.0679, zoom: 12},
      ]);
    });
};
