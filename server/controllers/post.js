const post = require("../models/post");
const image = require("../utils/image");

//Functions
async function createPost(req, res) {
    try {
        const newPost = new post(req.body);
        newPost.created_at = new Date();

        const imagePath = image.getFilePath(req.files.miniature);
        newPost.miniature = imagePath;

        const postStored = await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error while creating a post" });
    }
}




module.exports = {

    createPost,

};
