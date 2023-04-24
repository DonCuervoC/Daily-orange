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

async function getPost(req, res){

    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc" },
    };

    post.paginate({}, options, (error, postStored) =>{

        if(error){
            res.status(400).send({ msg: "Error while getting posts" });
        }else{
            res.status(200).send(postStored);
        }
    });

}




module.exports = {

    createPost,
    getPost,

};
