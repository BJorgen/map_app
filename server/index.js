"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const cookieSession = require('cookie-session');
const morgan        = require("morgan");
const app           = express();

app.set("view engine", "ejs");
app.use(morgan('dev'));
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

const server = app.listen(PORT, () => {

  console.log("Example app listening on port " + PORT);

});

// it is used by Mocha
module.exports = server;