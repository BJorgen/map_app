"use strict";

const express       = require('express');
const mapsRoutes  = express.Router();

const createMap = function (req, res){
  res.status(400).send();
};

const updatePoint = function (req, res){
  res.status(400).send();
};

const uploadImg = function (req, res){
  res.status(400).send();
};

const deleteImg = function (req, res){
  res.status(400).send();
};

const deletePoint = function (req, res){
  res.status(400).send();
};

const createFavorite = function (req, res){
  res.status(400).send();
};

const deleteFavorite = function (req, res){
  res.status(400).send();
};

//==============================================
//         HELPER FUNCTIONS
//==============================================

const getSendJSOnonSuccess = function(res){
  let  sendJSOnonSuccess = function(err, point){
    if(err){
      res.status(404).send();
    }else{
      res.json(point);
    }  
  }
  return sendJSOnonSuccess
}

module.exports = function(DataHelpers) {

  mapsRoutes.get("/", function (req, res){
    DataHelpers.getAllMaps(function(err, maps){
      if(err){
        res.status(500).send();
      }else{
        res.render('main',{maps});
      }
    })
  });

  mapsRoutes.get("/:map", function (req, res){
    DataHelpers.getMap(req.params.map, function(err, map){
      if(err){
        res.status(500).send();
      }else if(! map){
        res.status(404).send();
      }else{
        res.render('view_map', map);
      }
    });
   });

  mapsRoutes.get("/:map/points",  function (req, res){
    DataHelpers.getMapPoints(req.params.map, getSendJSOnonSuccess(res));
  });

  mapsRoutes.get("/:map/points/:point", function (req, res){
    const mapdId = req.params.map;
    const pointdId = req.params.point;
    if(! (mapdId && pointdId)){
      res.status(400).send();
    }
    DataHelpers.getPointById(pointdId, getSendJSOnonSuccess(res));
  });


  mapsRoutes.post("/", createMap);
  mapsRoutes.post("/:map/points", function (req, res){
    const params = {      
      description : req.body.description,
      latitude : req.body.latitude,
      longitude : req.body.longitude,
      map_id : req.params.map,
      title : req.body.title
    }
    if(!params.title || ! params.latitude || ! params.longitude || ! params.map_id){
      res.status(403).send();
    }
    else{
      DataHelpers.addPoint(params,function(err, point){
        if (err){
          res.status(403).send();
        }else{
          res.status(200).json(point);
        }
      })
    }
  });

  mapsRoutes.post("/:map/points/:point", updatePoint);
  mapsRoutes.post("/:map/points/:point/imgs", uploadImg);
  mapsRoutes.delete("/:map/points/:point/imgs/:img", deleteImg);
  mapsRoutes.delete("/:map/points/:point", deletePoint);
  mapsRoutes.post("/:map/favorite", createFavorite);
  mapsRoutes.delete("/:map/favorite", deleteFavorite);

  return mapsRoutes;
};
