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

//TODO test pourpose, delete it
const helloWorld = express.Router().get("/", function(req, res) {
    res.render("login");
  });


const DataHelpers = null //require("./lib/data-helpers.js")(db, ObjectID);

const sessionsRoutes = require("./routes/sessions")(DataHelpers);

app.use('/', helloWorld);
app.use("/sessions", sessionsRoutes);

const server = app.listen(PORT, () => {

  console.log("Example app listening on port " + PORT);

});

// it is used by Mocha
module.exports = server;