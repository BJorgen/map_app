
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favourites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favourites').insert([
        {id: 1000001, user_id: 1000003, map_id: 1000001},
        {id: 1000002, user_id: 1000003, map_id: 1000002}
      ]);
    });
};
