require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    }
});

function getUserById(userId, cb) {
  knex.select('*').from('users')
    .where('id', userId)
    .asCallback(function(err, userInfo) {
      if (err) {
        throw err;
      }
      cb(userInfo[0])
    });
}

function getUserByUsername(username, cb) {
  knex.select('*').from('users')
    .where('username', username)
    .asCallback(function(err, userInfo) {
      if (err) {
        throw err;
      }
      cb(userInfo[0])
    });
}

function getUserByEmail(email, cb) {
  knex.select('*').from('users')
    .where('email_address', email)
    .asCallback(function(err, userInfo) {
      if (err) {
        throw err;
      }
      cb(userInfo[0])
    });
}


function getAllUsers(cb) {
  knex.select('*').from('users').asCallback((err, res) => {
    if (err) {
      throw err;
    }
    cb(res)
  });
}


function addUser(user, cb) {
  knex('users').insert(user).asCallback((err, res)=> {
    cb(res)
  })
}

// --------- Test Function Calls -----

// getUserById(1, console.log)
// getUserByUsername('Gaga', console.log)
// getUserByEmail('bri@gmail.com', console.log)
// getAllUsers(console.log)


/// ----- Example User to Input ------
// userData = {
//   first_name: 'Ba',
//   last_name: 'Balast',
//   email_address: 'ba@gmail.com',
//   username: 'Baba',
//   password: '123'
// }

// addUser(userData, console.log)


