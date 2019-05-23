"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const morgan        = require("morgan");
const app           = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const helloWorld = express.Router().get("/", function(req, res) {
    res.send("<h1>Hello World</h1>");
  });

app.use('/', helloWorld);

app.listen(PORT, () => {

  console.log("Example app listening on port " + PORT);

});