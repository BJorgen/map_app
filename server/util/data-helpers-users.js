module.exports = function(knex){

//==============================================
//       GET USER - By Id, username, email
//==============================================
  
  function getUserById(userId, cb) {
    knex.select('*').from('users')
      .where('id', userId)
      .asCallback(function(err, userInfo) {
        if (err) {
          throw err;
        }
        cb(null, userInfo[0])
      });
  }

  function getUserByUsername(username, cb) {
    knex.select('*').from('users')
      .where('username', username)
      .asCallback(function(err, userInfo) {
        if (err) {
          throw err;
        }
        cb(null, userInfo[0])
      });
  }

  function getUserByEmail(email, cb) {
    knex.select('*').from('users')
      .where('email_address', email)
      .asCallback(function(err, userInfo) {
        if (err) {
          throw err;
        }
        cb(null, userInfo[0])
      });
  }

//==============================================
//                GET ALL USERS
//==============================================

  function getAllUsers(cb) {
    knex.select('*').from('users').asCallback((err, res) => {
      if (err) {
        throw err;
      }
      cb(null, res)
    });
  }

//==============================================
//                  ADD USER
//==============================================

  function addUser(user, cb) {
    knex('users').insert(user).returning('id').asCallback((err, userId)=> {
      if (err) {
        throw err;
      }
      getUserById(userId[0], cb)
    })
  }

//==============================================
//             GET USER PROFILE
//==============================================


  function getUserProfile (userId, cb){

  }


  return { 
    getUserById, 
    getUserByUsername, 
    getUserByEmail, 
    getAllUsers, 
    addUser, 
    getUserProfile
  }

}