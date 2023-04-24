const express = require("express");
const multiparty = require("connect-multiparty");
const postController = require("../controllers/post");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

//Endpoint



module.exports = api;


