const express = require("express");
const routes = express.Router();

const { LOGIN } = require("../controller/login");

module.exports = routes
    .post("/login", LOGIN);
