"use strict";

const express       = require('express');
const mapsRoutes  = express.Router();

const createMap = function (req, res){
  res.status(400).send();
};

const deleteImg = function (req, res){
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

const isAuthorized = function(req){
  let userID = req.session.user_id;
  let userName = req.session.user_name;
  return (userID && userName);
}
//==============================================
//         MAPS ROUTES
//==============================================
module.exports = function(DataHelpers) {

  mapsRoutes.get("/new", function(req, res){
    res.render('new_map', {user_name : (req.session.user_name ? req.session.user_name :  "")});
  })

  mapsRoutes.get("/", function (req, res){
    DataHelpers.getAllMaps(function(err, maps){
      if(err){
        res.status(500).send();
      }else{
        // res.render('main',{maps, user_name : (req.session.user_name ? req.session.user_name :  "")});
        if(!req.session.user_id) {
          res.render('main',{maps, profile : null, user_name : (req.session.user_name ? req.session.user_name :  "")});
        } else {
          DataHelpers.getUserProfile(req.session.user_id,function(err, profile){
            if(err){
              res.status(500).send();
            } else{
            res.render('main',{maps, profile : profile, user_name : (req.session.user_name ? req.session.user_name :  "")});
            } 
          });
        }
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
        res.render('view_map',{map, user_name : (req.session.user_name ? req.session.user_name :  "") });
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

  mapsRoutes.put("/:map/points/:point", function (req, res){
    const params = {      
      description : req.body.description,
      map_id : Number(req.params.map),
      title : req.body.title
    }
    console.log(params);
    if(!params.title  || ! params.map_id || ! req.params.point){
      res.status(403).send();
    }
    else{
      DataHelpers.editPointById(Number(req.params.point), params, getSendJSOnonSuccess(res));
    }
  });

  mapsRoutes.delete("/:map/points/:point", function (req, res){
    const pointdId = req.params.point;
    console.log("pointdId", pointdId);
    if(! (pointdId)){
      res.status(400).send();
    }
    DataHelpers.deletePointByID(pointdId, function(err){
      if(err){
        console.log("err on point delete", err);
        res.status(404).send();
      }else{
        console.log("ok")
        res.status(200).send("OK");
      }  
    })
  });

//==============================================
//       ADD and DELETE MAPS FAVOURITES
//==============================================
  const addMapFavourite = function (req, res){
    console.log('ADD Favourite', 'user_id: ', req.session.user_id,'map_id:',req.params.map)
    DataHelpers.addMapFavourite(req.session.user_id, req.params.map, function(err, listOfFavourites){
      if(err){
        res.status(500).send();
      }else{
        res.status(200).json(listOfFavourites);
      }
    });
  }

  const deleteMapFavourite = function (req, res){
    console.log('DELETE Favourite', 'user_id:',req.session.user_id,'map_id:',req.params.map)
    DataHelpers.deleteMapFavourite(req.session.user_id, req.params.map, function(err, listOfFavourites){
      if(err){
        res.status(500).send();
      }else{
        res.status(200).json(listOfFavourites);
      }
    });
  }



  mapsRoutes.post("/:map/favourite", addMapFavourite);
  mapsRoutes.delete("/:map/favourite", deleteMapFavourite);
//==============================================

  mapsRoutes.put("/:map/points/:point/imgs", function (req, res){
    const pointdId = Number(req.params.point);
    const url = req.body.url;
    if( ! (pointdId && url)){
      res.status(400).send();
    }
    DataHelpers.updatePointImage(pointdId, url, getSendJSOnonSuccess(res));
  });

  mapsRoutes.delete("/:map/points/:point/imgs/:img", deleteImg);
  mapsRoutes.post("/", createMap);

  return mapsRoutes;
};
