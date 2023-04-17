
const bcrypt = require("bcryptjs");
const User = require("../models/user");

function register(req, res) {
    console.log(req.body);

    const { firstName, lastName, email, password } = req.body;

    if (!email) res.status(400).send({ "msg": "You must introduce an email" });
    if (!password) res.status(400).send({ "msg": "You must introduce a password" });

    const user = new User({

        firstName,
        lastName,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        
    });

    const salt = bcrypt.genSaltSync(10);
    const hasgPassword =  bcrypt.hashSync(password,salt);
    user.password = hasgPassword;

    user.save()
    .then(userStorage => {
      res.status(200).send(userStorage);
    })
    .catch(error => {
      res.status(400).send({ msg: "Error while creating user" });
    });
      

    //console.log(password);
    // console.log(hasgPassword);
    //console.log(user);
    //console.log("registration has been executed");
    // res.status(200).send({ msg: "all right" });
}
module.exports = {
    register,
};