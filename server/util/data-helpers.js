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

const map_helpers = require('./data-helpers-maps')(knex);
const user_helpers = require('./data-helpers-maps')(knex);
let dataHelpers = map_helpers;

module.exports = dataHelpers;

//==============================================
//            Test User Fuctionality
//==============================================


// ser_helpers.getUserById(1, console.log)
// ser_helpers.getUserByUsername('Gaga', console.log)
// ser_helpers.getUserByEmail('bri@gmail.com', console.log)
// ser_helpers.getAllUsers(console.log)


// //----- Example User to Input ------
// userData = {
//   first_name: 'Bo',
//   last_name: 'Bolast',
//   email_address: 'bo@gmail.com',
//   username: 'Bobo',
//   password: '123'
// }

// user_helpers.addUser(userData, console.log)


//==============================================
//            Test Map Fuctionality
//==============================================


//map_helpers.getMap(3, console.log);
//map_helpers.getMapPoints(1, console.log)
//map_helpers.getPointImages(3, console.log)


// //----- Example Map to Input ------

// const mapData = {
//     map: {
//       name: 'Eating out During Bootcamp',
//       public: true,
//       user_id: 1
//     },
//     settings: {
//       center_long: -114.0666796,
//       center_lat: 51.0442381,
//       zoom: 16.5
//     }
//   }

// map_helpers.addMap(mapData, console.log)

// map_helpers.getAllMaps(console.log)

//map_helpers.getPointById(1,console.log)

// const pointData = {
//     title: 'New Point',
//     description: 'Fun Place',
//     longitude: '-114.058937',
//     latitude: '51.046669',
//     map_id: 1
// }

// map_helpers.addPoint(pointData, console.log)

