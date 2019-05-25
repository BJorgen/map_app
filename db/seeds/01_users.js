
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1000001, first_name: 'Gi', last_name:'Gilast', email_address:'gi@gmail.com', username:'Gigi', password:'123'},
        {id: 1000002, first_name: 'Ga', last_name:'Galast', email_address:'ga@gmail.com', username:'Gaga', password:'123'},
        {id: 1000003, first_name: 'Bri', last_name:'Brilast', email_address:'bri@gmail.com', username:'Bribri', password:'123'}
      ]);
    });
};
