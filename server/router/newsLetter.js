const express = require("express");
const NewsletterController = require("../controllers/newsLetter");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

// Endpoint
api.post("/newsletter", NewsletterController.subscribe);

module.exports = api;


