
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributors').del()
    .then(function () {
      // Inserts seed entries
      return knex('contributors').insert([
        {id: 1000001, user_id: 1000001, map_id: 1000001},
        {id: 1000002, user_id: 1000002, map_id: 1000002},
        {id: 1000003, user_id: 1000002, map_id: 1000003},
        {id: 1000004, user_id: 1000003, map_id: 1000003}
      ]);
    });
};
