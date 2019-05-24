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


function getMapSettings(mapSettingId, cb) {
  knex.select('*').from('map_settings')
    .where('id', mapSettingId)
    .asCallback(function(err, mapSettings) {
      if (err) {
        throw err;
      }
      cb(null,mapSettings[0]);
      });
}

function getMap(mapId, cb) {
 let map;
  knex.select('*').from('maps')
    .where('id', mapId)
    .asCallback(function(err, mapData) {
      if (err) {
        throw err;
      }
      map = mapData[0];
      console.log(map.map_setting_id)
      getMapSettings(map.map_setting_id , function(err, res) {
        if (err) {
          throw err;
        }
        map.settings = res;
        cb(null, map)
      });
    });
}


function getPointImages(pointId, cb) {
  knex.select('*').from('images')
  .where('point_id', pointId)
  .asCallback(function(err, pointImages) {
    if (err) {
      throw err;
    }
    cb(pointImages)
  });
}


function getMapPoints(mapId, cb) {
  knex.select('*',{ image_id: 'images.id' }).from('points')
    .innerJoin('images','points.id','images.point_id')
    .where('map_id', mapId)
    .asCallback(function(err, mapPoints) {
      if (err) {
        throw err;
      }
      points = mapPoints;
      cb(mapPoints)
    });
}

function getUserWithId(userId, cb) {
  knex.select('*').from('users')
    .where('id', userId)
    .asCallback(function(err, userInfo) {
      if (err) {
        throw err;
      }
      cb(userInfo[0])
    });
}

module.exports = {getMap : getMap};

// --------- Test Function Calls -----

//getMap(3, console.log);
//getMapPoints(3, console.log)
//getPointImages(3, console.log)
//getUserWithId(1, console.log)