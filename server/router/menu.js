const express = require("express");
const MenuController = require("../controllers/menu");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

//Endpoint
api.post("/menu", [md_auth.asureAuth], MenuController.createMenu);
api.get("/menu", MenuController.getMenus);


module.exports = api;
