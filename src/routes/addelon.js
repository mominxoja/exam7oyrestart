const express = require("express");
const routes = express.Router();

const { AddElon, GetElon } = require("../controller/addelon");

module.exports = routes
    .post("/addelon", AddElon)
    .get("/addelon/:page", GetElon);
