const express = require("express");
const routes = express.Router();

const { Register } = require("../controller/register");

module.exports = routes
    .post("/register", Register)
