const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

//END POINT
api.post("/auth/register", AuthController.register);

module.exports = api;

