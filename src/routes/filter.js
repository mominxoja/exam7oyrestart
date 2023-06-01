
const express = require("express");
const routes = express.Router();

const { Filter} = require("../controller/filter");

module.exports = routes
    .post("/filter/:filter", Filter )