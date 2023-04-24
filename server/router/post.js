const express = require("express");
const multiparty = require("connect-multiparty");
const postController = require("../controllers/post");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

//Endpoint
//add
api.post("/post", [md_auth.asureAuth, md_upload], postController.createPost);
//get
api.get("/post",  postController.getPost);
//update
api.patch("/post/:id", [md_auth.asureAuth, md_upload], postController.updatePost);


module.exports = api;


