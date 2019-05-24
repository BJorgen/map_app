module.exports = function(knex){


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
      cb(null, pointImages)
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
        cb(null, mapPoints)
      });
  }


  function getAllMaps(cb) {
    knex.select('*').from('maps').asCallback((err, res) => {
      if (err) {
        throw err;
      }
      cb(null,res)
    });
  }


  function addMapSettings(settings,cb) {
    knex('map_settings').insert(mapData.settings).returning('id').asCallback((err, settingsId)=> {
      if (err) {
        throw err;
      }
      cb(null, settingsId[0])
    });
  }


  function addMap(mapData, cb) {
    addMapSettings(mapData.settings, function(mapSettingsId) {
      mapData.map.map_setting_id = mapSettingsId;
      knex('maps').insert(mapData.map).returning('id').asCallback((err, mapId)=> {
        if (err) {
          throw err;
        }
        getMap(mapId[0],cb);
      });
    });
  }

  function getPointById(pointId, cb) {
    knex.select('*').from('points')
      .where('id', pointId)
      .asCallback(function(err, pointInfo) {
        if (err) {
          throw err;
        }
        cb(null, pointInfo[0])
      });
  }


  function addPoint(point, cb) {
    knex('points').insert(point).returning('id').asCallback((err, pointId)=> {
      if (err) {
        throw err;
      }
      getPointById(pointId[0],cb);
    });
  }


  function getMapLikes() {

  }

  function getMapContributors() {

  }

  return { getMapSettings, getMap, getPointImages, getMapPoints, getAllMaps, addMapSettings, addMap, getPointById, addPoint }
}




