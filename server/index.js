"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const cookieSession = require('cookie-session');
const app           = express();
require('dotenv').config();

if ( process.env.NODE_ENV === 'development'){
  const morgan        = require("morgan");
  app.use(morgan('dev'));
  console.log('in dev mode');
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const datahelpers = require('./util/data-helpers');
const sessionsRoutes = require("./routes/sessions")(datahelpers);
const mapsRoutes = require("./routes/maps")(datahelpers);
const usersRoutes = require("./routes/users")(datahelpers);
app.use("/sessions", sessionsRoutes);
app.use("/maps", mapsRoutes);
app.use("/users", usersRoutes);

const server = app.listen(process.env.PORT || PORT, () => {

  console.log("Example app listening on port " + (process.env.PORT || PORT));

});

// it is used by Mocha
module.exports = server;