const express = require("express");
const NewsletterController = require("../controllers/newsLetter");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

// Endpoint
// Add
api.post("/newsletter", NewsletterController.subscribe);
// Get 
api.get("/newsletter", [md_auth.asureAuth] , NewsletterController.getSuscribers);

module.exports = api;


