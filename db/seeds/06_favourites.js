
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favourites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favourites').insert([
        {id: 1, user_id: 3, map_id: 1},
        {id: 2, user_id: 3, map_id: 2}
      ]);
    });
};
