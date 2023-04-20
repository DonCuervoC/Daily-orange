const User = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

async function getMe(req, res) {

    const { user_id } = req.user;
    const response = await User.findById(user_id);

    if (!response) {
        res.status(400).send({ msg: " Not user found" });
    } else {
        res.status(200).send(response);
    }
    // console.log(req.user);
    // res.status(200).send({ msg: "OK" });
}

async function getUsers(req, res) {

    const { active } = req.query;
    //{{ _.BASE_PATH }}/users?active=false
    //console.log("active -> ", active);
    let response = null;

    if (active === undefined) {
        response = await User.find();
    } else {
        response = await User.find({ active });
    }
    // console.log(response);
    // res.status(200).send({ msg: "OK" });
    res.status(200).send(response);
}

async function createUser(req, res) {

    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);

    const user = new User({ ...req.body, active: false, password: hasPassword });
    // console.log(user);

    if (req.files.avatar) {

        const imagePath = image.getFilePath(req.files.avatar);
        //console.log(imageName);
        user.avatar = imagePath;
    }

    try {
        const userStored = await user.save();
        res.status(201).send(userStored);
    } catch (error) {
        res.status(400).send({ msg: "Error while creating user" });
    }
}

async function updateUser(req, res) {

    const { id } = req.params;
    const userData = req.body;

    //password
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hasPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hasPassword;
    }else{
        delete userData.password;
    }
    
    //avatar
    if(req.files.avatar){
       // console.log(req.files.avatar);
       const imagePath = image.getFilePath(req.files.avatar);
       userData.avatar = imagePath;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData);
        res.status(200).send({ msg: "Update OK" });
    } catch (error) {
        res.status(400).send({ msg: "Error while updating user" });
    }
}



module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
};