
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {id: 1000001, name: 'Best Bridges In Calgary', public: true, user_id: 1000001, map_setting_id: 1000001},
        {id: 1000002, name: 'Beautiful Buildings', public: true, user_id: 1000002, map_setting_id: 1000002},
        {id: 1000003, name: 'Public Art Work', public: true, user_id: 1000002, map_setting_id: 1000003}
      ]);
    });
};
