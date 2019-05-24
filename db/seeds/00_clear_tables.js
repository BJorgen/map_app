
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributors').del()
    .then(function(){
      return knex('favourites').del()
      .then(function(){
        return knex('images').del()
        .then(function(){
          return knex('favourites').del()
          .then(function(){
            return knex('points').del()
            .then(function(){
              return knex('maps').del()
              .then(function(){
                return knex('map_settings').del()
                .then(function(){
                  return knex('users').del()
                })
              })
            })
          })
        })
      })
    })
};

