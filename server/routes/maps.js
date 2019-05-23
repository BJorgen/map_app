"use strict";

const express       = require('express');
const mapsRoutes  = express.Router();


const get_new = function (req, res){
  res.render('main');
};

module.exports = function(DataHelpers) {
  mapsRoutes.get("/", get_new);

  return mapsRoutes;
}();
