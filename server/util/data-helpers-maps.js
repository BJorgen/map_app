module.exports = function(knex){

//==============================================
//             GET MAP and SETTINGS
//==============================================

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
  // TODO use join -. one query
    knex.select('*').from('maps')
      .where('id', mapId)
      .asCallback(function(err, mapData) {
        if (err) {
          throw err;
        }
        map = mapData[0];
        if(map){
          getMapSettings(map.map_setting_id , function(err, res) {
            if (err) {
              throw err;
            }
            map.settings = res;
            cb(null, map)
          });
        }else{
          cb(null,null);
        }
      });
  }



//==============================================
//         GET ADD DELETE map POINTS with IMAGES
//==============================================

  function getPointImages(pointId, cb) {
    knex.select('*').from('images')
    .where('point_id', pointId)
    .asCallback(function(err, pointImages) {
      if (err) {
        throw err;
      }
      cb(null, pointImages);
    });
  }

  function updatePointImage(point_id, url, cb ){
    deletePointImages(point_id, addPointImage(point_id, url, cb));
  }

  function deletePointImages(point_id, cb) {
    knex('images')
    .where('point_id', point_id)
    .del()
    .asCallback(cb);
  }

  function addPointImage(point_id, url, cb) {
    knex('images').insert({image_url : url, point_id : point_id})
    .returning('id')
    .asCallback((err, res)=> {
      if (err) {
        throw err;
      }
    cb(null, res[0]);
    });
  }

// ---- returns a list of map points/detail in an map -----
  function getMapPoints(mapId, cb) {
    knex.select('points.*',{ image_id: 'images.id' }, {image_url : 'images.image_url'})
    .from('points')
    .leftJoin('images','points.id','images.point_id')
    .where('map_id', mapId)
    .asCallback(function(err, mapPoints) {
      if (err) {
        throw err;
      }
      cb(null, mapPoints);
    });
  }

//==============================================
//                GET ALL MAPS
//==============================================
// ---- returns a list of all maps -----
function getAllMaps(cb) {
  //Send an array of urls as well
  knex.select('maps.*', knex.raw('json_agg(images.image_url) as urls')).from('maps')
  .leftJoin('points','points.map_id','maps.id')
  .leftJoin('images','points.id','images.point_id')
  .groupByRaw('maps.id')
  .asCallback((err, res) => {
    if (err) {
      throw err;
    }
    cb(null,res);
  });
}

//==============================================
//             ADD MAP and SETTINGS
//==============================================
// ---- helper function for add map to create map settings -----
  function addMapSettings(mapSettings, cb) {
    knex('map_settings')
    .insert(mapSettings)
    .returning('id')
    .asCallback((err, settingsId)=> {
      if (err) {
        throw err;
      }
      cb(null, settingsId[0]);
    });
  }

// ---- responds with map object -----
  function addMap(data, cb) {
    addMapSettings(data.settings, function(err, mapSettingsId) {
      if (err) {
        throw err;
      }
      data.map.map_setting_id = mapSettingsId;
      knex('maps')
      .insert(data.map)
      .returning('id')
      .asCallback((err, mapId)=> {
        if (err) {
          throw err;
        }
        getMap(mapId[0],cb);
      });
    });
  }

//==============================================
//          ADD and GET POINT by Id
//==============================================
// ---- responds with point object -----
  function getPointById(pointId, cb) {
    knex.select('points.*',{ image_id: 'images.id' }, {image_url : 'images.image_url'})
    .from('points')
    .leftJoin('images','points.id','images.point_id')
    .where('points.id', pointId)
    .asCallback(function(err, pointInfo) {
      if (err) {
        throw err;
      }
      cb(null, pointInfo[0]);
    });
  }

// ---- responds with point object -----
  function addPoint(point, cb) {
    knex('points').insert(point)
    .returning('id')
    .asCallback((err, pointId)=> {
      if (err) {
        throw err;
      }
      getPointById(pointId[0], cb);
    });
  }

  function editPointById(point_id, point, cb) {
    knex('points')
    .where({ id: point_id })
    .update(point)
    .returning('*')
    .asCallback((err, res) => {
      if (err) {
        throw err;
      }
      cb(null, res[0])
    });
  }

  function deletePointByID(point_id, cb) {
    knex('points')
    .where('id', point_id)
    .del()
    .asCallback(cb);
  }


//==============================================
//       GET, ADD and DELETE MAP FAVORITE
//==============================================
// ---- responds with array of favourites (user_id) for map -----
  function getMapFavourites(map_id, cb) {
    knex.select('user_id').from('favourites')
    .where('map_id', map_id)
    .asCallback(function(err, favourites) {
      if (err) {
        throw err;
      }
      userArray = favourites.map(x => x.user_id);
      cb(null, userArray)
    });
  }

// ---- responds with array of favourites (user_id) for map -----
  function addMapFavourite(user_id, map_id, cb) {
    getMapFavourites(map_id, function(err, userArray) {
      if (err) {
        throw err;
      }
      if (userArray.includes(user_id)) {
        getMapFavourites(map_id, cb);
      }
      else {
        knex('favourites')
        .insert({user_id: user_id, map_id: map_id})
        .asCallback((err, res) => {
          if (err) {
            throw err;
          }
          getMapFavourites(map_id, cb);
        });
      }
    });
  }

// ---- responds with array of favourites (user_id) for map -----
  function deleteMapFavourite(user_id, map_id, cb) {
    knex('favourites')
    .where('user_id', user_id)
    .andWhere('map_id', map_id)
    .del()
    .asCallback((err, res) => {
      getMapFavourites(map_id, cb);
    });
  }
  
//==============================================
//         GET and ADD MAP CONTRIBUTOR
//==============================================

// ---- responds with array of contributors (user_id) for map -----
  function getMapContributors(map_id, cb) {
    knex.select('user_id').from('contributors')
    .where('map_id', map_id)
    .asCallback(function(err, contributors) {
      if (err) {
        throw err;
      }
      userArray = contributors.map(x => x.user_id);
      cb(null, userArray);
    });
  }

// ---- responds with array of contributors (user_id) for map -----
  function addMapContributor(user_id, map_id, cb) {
    getMapContributors(map_id, function(err, userArray) {
      if (err) {
        throw err;
      }
      if (userArray.includes(user_id)) {
        cb(null, userArray);
      }
      else {
        knex('contributors')
        .insert({user_id: user_id, map_id: map_id})
        .asCallback((err, res)=> {
          if (err) {
            throw err;
          }
          getMapContributors(map_id, cb);
        });
      }
    });
  }


//==============================================
//             GET USER PROFILE
//==============================================

// ---- responds with array of user favourite maps (map_id) -----
  function getUserFavourites (userId, cb) {
    knex.select({ id: 'favourites.map_id'} ,{name: 'maps.name'}, knex.raw('json_agg(images.image_url) as urls'))
    .from('favourites')
    .join('maps','favourites.map_id','maps.id')
    .where('favourites.user_id',userId)
    .leftJoin('points','points.map_id','maps.id')
    .leftJoin('images','points.id','images.point_id')
    .groupByRaw('favourites.map_id, maps.name')
    .asCallback((err, res) => {
      if (err) {
        throw err;
      }
      cb(null, res)
    });
  }
// ---- responds with array of user contributed maps (map_id) -----
  function getUserContributions (userId, cb) {
    knex.select({ id: 'contributors.map_id'} ,{name: 'maps.name'})
    .from('contributors')
    .join('maps','contributors.map_id','maps.id')
    .where('contributors.user_id',userId)
    .asCallback((err, res) => {
      if (err) {
        throw err;
      }
      cb(null, res)
    });
  }

  function getUserProfile (userId, cb) {
    let userProfile= {user_id : userId}
    getUserFavourites(userId, (err, res) => {
      if (err) {
        throw err;
      }
      userProfile.favourites=res;
      getUserContributions(userId, (err, res) => {
        userProfile.contributions = res;
        cb(null, userProfile)
      });
    });
  }

  return { 
    getMap, 
    getPointImages, 
    getMapPoints, 
    getAllMaps,
    getPointById,
    addMap,
    addPoint,
    editPointById,
    deletePointByID,
    getMapFavourites,
    addMapFavourite,
    deleteMapFavourite,
    getMapContributors,
    addMapContributor,
    getUserFavourites,
    getUserContributions,
    getUserProfile,
    updatePointImage
  }

}