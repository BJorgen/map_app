"use strict";

const express       = require('express');
const mapsRoutes  = express.Router();


const get = function (req, res){
  res.render('main');
};

const getMap = function (req, res){
  res.status(400).send();
};

const getPoint = function (req, res){
  res.status(400).send();
};

const createMap = function (req, res){
  res.status(400).send();
};

const createPoint = function (req, res){
  res.status(400).send();
};

module.exports = function(DataHelpers) {
  mapsRoutes.get("/", get);
  mapsRoutes.get("/:map", getMap);
  mapsRoutes.get("/:map/points/:point", getPoint);
  mapsRoutes.post("/", createMap);
  mapsRoutes.post("/:map/points", createPoint);

  return mapsRoutes;
}();
