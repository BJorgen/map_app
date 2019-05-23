
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {id: 1, name: 'Best Bridges In Calgary', public: true, user_id: 1, map_setting_id: 1},
        {id: 2, name: 'Beautiful Buildings', public: true, user_id: 2, map_setting_id: 2},
        {id: 3, name: 'Public Art Work', public: true, user_id: 2, map_setting_id: 3}
      ]);
    });
};
