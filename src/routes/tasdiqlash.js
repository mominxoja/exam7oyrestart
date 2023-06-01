const express = require("express");
const routes = express.Router();

const { Tasdiqlash, GetTasdiqlash } = require("../controller/tasdiqlash");

module.exports = routes
    .put("/tasdiqlash/:id", Tasdiqlash)
    .get("/tasdiqlash", GetTasdiqlash)
