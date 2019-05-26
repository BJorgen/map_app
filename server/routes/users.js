"use strict";

const express = require('express');
const usersRoutes = express.Router();

module.exports = function(dataHelpers) {

//==============================================
//              HELPER FUNCTIONS
//==============================================

  const getProfile = function (req, res){
    dataHelpers.getUserProfile(req.params.user,function(err, profile){
      if(err){
        res.status(500).send();
      }else{
        res.render('profile',{profile, user_name : (req.session.user_name ? req.session.user_name :  "")});
      }
    });
  }

  const getProfileJSON = function (req, res){
    dataHelpers.getUserProfile(req.params.user,function(err, profile){
      if(err){
        res.status(500).send();
      }else{
        res.send(JSON.stringify(profile));
      }
    });
  }

//==============================================
//                 USER ROUTES
//==============================================

  usersRoutes.get("/:user", getProfile);
  usersRoutes.get("/:user/JSON", getProfileJSON);
  return usersRoutes;

};
