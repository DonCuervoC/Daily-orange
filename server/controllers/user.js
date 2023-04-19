const User = require("../models/user")

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



module.exports = {
    getMe,
    getUsers,
};