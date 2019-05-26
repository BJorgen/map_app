"use strict";

const express       = require('express');
const sessionsRoutes  = express.Router();

module.exports = function(DataHelpers) {

const get_new = function (req, res){
  res.render('login');
};

const post = function (req, res){
  const email = req.body.email;
  const password = req.body.password; 
  if ( ! email || ! password){
    res.status(400).send();
    return;
  }else{
    DataHelpers.getUserByEmail(email,function(err,user){
      if(err){
        console.log(err);
        res.status(500).send();
      }if( ! user){
        res.status(403).send();
      }else{
        req.session.user_name = user.username;
        req.session.id = user.id;
        res.redirect('/maps');
      }
    })
  }
};

const deleteSession = function (req, res){
  res.status(200).send();
};

  sessionsRoutes.get("/new", get_new);
  sessionsRoutes.post("/", post);
  sessionsRoutes.delete("/", deleteSession);


  return sessionsRoutes;
};
