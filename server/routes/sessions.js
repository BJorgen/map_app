"use strict";

const express       = require('express');
const sessionsRoutes  = express.Router();


const get_new = function (req, res){
  res.render('login');
};

const post = function (req, res){
  if ( ! req.body.user_name){
    res.status(403).send();
    return;
  }else{
    res.status(200).send();
  }
};

const deleteSession = function (req, res){
  res.status(200).send();
};

module.exports = function(DataHelpers) {

  sessionsRoutes.get("/new", get_new);
  sessionsRoutes.post("/", post);
  sessionsRoutes.delete("/", deleteSession);


  return sessionsRoutes;
};
