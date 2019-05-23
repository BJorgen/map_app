"use strict";

const express       = require('express');
const sessionsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  sessionsRoutes.get("/new",
    function(req, res) {
      res.render("login");
    }
  );


  return sessionsRoutes;

}