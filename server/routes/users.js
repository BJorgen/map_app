"use strict";

const express       = require('express');
const usersRoutes  = express.Router();

const getProfile = function (req, res){
  res.status(400).send();
};

module.exports = function(DataHelpers) {
  usersRoutes.get("/:user", getProfile);

  return usersRoutes;
};
