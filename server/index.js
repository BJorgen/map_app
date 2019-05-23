"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const morgan        = require("morgan");
const app           = express();

app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const sessionsRoutes = require("./routes/sessions");
const mapsRoutes = require("./routes/maps");
app.use("/sessions", sessionsRoutes);
app.use("/maps", mapsRoutes);
const server = app.listen(PORT, () => {

  console.log("Example app listening on port " + PORT);

});

// it is used by Mocha
module.exports = server;