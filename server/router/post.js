const express = require("express");
const multiparty = require("connect-multiparty");
const postController = require("../controllers/post");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

//Endpoint
//add
api.post("/post", [md_auth.asureAuth, md_upload], postController.createPost);
//get posts list
api.get("/post",  postController.getPosts);
//update
api.patch("/post/:id", [md_auth.asureAuth, md_upload], postController.updatePost);
// delete
api.delete("/post/:id", [md_auth.asureAuth], postController.deletePost);
//get one post by path
api.get("/post/:path", postController.getPost);


module.exports = api;


