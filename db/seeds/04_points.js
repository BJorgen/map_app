
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points').del()
    .then(function () {
      // Inserts seed entries
      return knex('points').insert([
        {id: 1000001, title: 'Peace Bridge', description: 'A great place to take selfies', longitude: -114.0790, latitude: 51.0539, map_id: 1000001},
        {id: 1000002, title: 'The Bow', description: 'Large building in the centre of town', longitude: -114.061821, latitude: 51.048031, map_id: 1000002},
        {id: 1000003, title: 'Central Library', description: 'Hang out and read books', longitude: -114.05503642017334, latitude: 51.04537729800863, map_id: 1000002},
        {id: 1000004, title: 'Travelling Light', description: 'A controversial art piece and a very big circle', longitude: -114.04226288795581, latitude: 51.142729380355824, map_id: 1000003},
        {id: 1000005, title: 'Wonderland Sculpture', description: 'Big head in the center of town', longitude: -114.06212213977147, latitude: 51.0475971214626, map_id: 1000003},
        {id: 1000006, title: 'Armengol Statues', description: 'Very tall people to look up to', longitude: -114.05993686946778, latitude: 51.04766864575323, map_id: 1000003}
      ]);
    });
};