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
const user_helpers = require('./data-helpers-users')(knex);
let dataHelpers = map_helpers;

module.exports = dataHelpers;



//==============================================
//            Test User Fuctionality
//==============================================


// user_helpers.getUserById(1, (err, res) => console.log(res))
// user_helpers.getUserByUsername('Gaga', (err, res) => console.log(res))
// user_helpers.getUserByEmail('bri@gmail.com', (err, res) => console.log(res))
// user_helpers.getAllUsers((err, res) => console.log(res))

// userData = {
//   first_name: 'Bo',
//   last_name: 'Bolast',
//   email_address: 'bo@gmail.com',
//   username: 'Bobo',
//   password: '123'
// }

// user_helpers.addUser(userData, (err, res) => console.log(res))


//==============================================
//            Test Map Fuctionality
//==============================================


// map_helpers.getMap(1000003, (err, res) => console.log(res))
// map_helpers.getMapPoints(1000001, (err, res) => console.log(res))
// map_helpers.getPointImages(1000003, (err, res) => console.log(res))

// const mapData = {
//     map: {
//       name: 'Eating out During Bootcamp',
//       public: true,
//       user_id: 1000001
//     },
//     settings: {
//       center_long: -114.0666796,
//       center_lat: 51.0442381,
//       zoom: 16.5
//     }
//   }

// map_helpers.addMap(mapData, (err, res) => console.log(res))

// map_helpers.getAllMaps((err, res) => console.log(res))

// map_helpers.getPointById(1000001,(err, res) => console.log(res))

// const pointData = {
//     title: 'New Point',
//     description: 'Fun Place',
//     longitude: '-114.058937',
//     latitude: '51.046669',
//     map_id: 1000001
// }

// map_helpers.addPoint(pointData, (err, res) => console.log(res))



// map_helpers.addMapFavourite(1000001, 1000002, (err, res) => console.log(res))
// map_helpers.getMapFavourites(1000001, (err, res) => console.log(res))
// map_helpers.deleteMapFavourite(1000001, 1000002, (err, res) => console.log(res))

// map_helpers.addMapContributor(1000003, 1000002, (err, res) => console.log(res))
// map_helpers.getMapContributors(1000003, (err, res) => console.log(res))

// map_helpers.getUserFavourites(1000001, (err, res) => console.log(res))
// map_helpers.getUserContributions(1000001, (err, res) => console.log(res))
// map_helpers.getUserProfile(1000003, (err, res) => console.log(res))

// pointData2 = {
//     title: 'Changed Point',
//     description: 'Fun Place - I changed the point desctiption!! fun'
// }

// map_helpers.editPointById(1000001,pointData2,(err, res) => console.log(res))
