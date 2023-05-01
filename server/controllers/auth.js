
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

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
  const hasgPassword = bcrypt.hashSync(password, salt);
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

function login(req, res) {

  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "The email is mandatory" });
  if (!password) res.status(400).send({ msg: "The password is mandatory" });

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase }).exec()
    .then((userStore) => {
      // console.log("Password : ", password);
      // console.log(userStore);
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Server error" });
        } else if (!check) {
          res.status(400).send({ msg: "Incorrect password" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "Unauthorized or inactive user" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).send({ msg: "Server error" });
    });
}

function refreshAccessToken(req, res) {

  const { token } = req.body;
  if(!token) res.status(400).send({ msg: "Token required"});
  const{ user_id } = jwt.decoded(token);

  User.findOne({ _id: user_id }).exec()
  .then((userStorage) => {
    res.status(200).send({
      accesToken: jwt.createAccessToken(userStorage)
    })
  })
  .catch((error) => {
    res.status(500).send({ msg: "Server error" });
  });
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};