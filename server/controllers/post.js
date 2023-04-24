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

async function getPosts(req, res) {

    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc" },
    };

    post.paginate({}, options, (error, postStored) => {
        if (error) {
            res.status(400).send({ msg: "Error while getting posts" });
        } else {
            res.status(200).send(postStored);
        }
    });
}

async function updatePost(req, res) {

    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }
    try {
        const updatedPost = await post.findByIdAndUpdate(id, postData, { new: true });
        res.status(200).send({ msg: "post updated OK", post: updatedPost });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error while updating posts" });
    }
}

async function deletePost(req, res) {

    const { id } = req.params;
    try {
        const deletedPost = await post.findByIdAndDelete(id);
        res.status(200).send({ msg: "post deleted OK", post: deletedPost });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error while deleting posts" });
    }
}

async function getPost(req, res) {

    const { path } = req.params;

    try {
        const postStored = await post.findOne({ path }).exec();

        if (!postStored) {
            res.status(400).send({ msg: "No post was found" });
        } else {
            res.status(200).send(postStored);
        }
    } catch (error) {
        res.status(500).send({ msg: "Error on server" });
    }
}



module.exports = {

    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,

};
