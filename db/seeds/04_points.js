
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points').del()
    .then(function () {
      // Inserts seed entries
      return knex('points').insert([
        {id: 1, title: 'Peace Bridge', description: 'A great place to take selfies', longitude: -114.0790, latitude: 51.0539, map_id: 1},
        {id: 2, title: 'The Bow', description: 'Large building in the centre of town', longitude: -114.061821, latitude: 51.048031, map_id: 2},
        {id: 3, title: 'Central Library', description: 'Hang out and read books', longitude: -114.05503642017334, latitude: 51.04537729800863, map_id: 2},
        {id: 4, title: 'Travelling Light', description: 'A controversial art piece and a very big circle', longitude: -114.04226288795581, latitude: 51.142729380355824, map_id: 3},
        {id: 5, title: 'Wonderland Sculpture', description: 'Big head in the center of town', longitude: -114.06212213977147, latitude: 51.0475971214626, map_id: 3},
        {id: 6, title: 'Armengol Statues', description: 'Very tall people to look up to', longitude: -114.05993686946778, latitude: 51.04766864575323, map_id: 3}
      ]);
    });
};