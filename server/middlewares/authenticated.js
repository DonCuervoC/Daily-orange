const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
    //    // console.log("Hello from asureAuth");
    //     //res.status(500).send({ msg: " Middleware blocked" });
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        res.status(403).send({ msg: "The request does not have the authentication header" });
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    //console.log(token);
    try {
        const payload = jwt.decoded(token);
        //console.log(payload);
        const { exp } = payload;
        const currentDate = new Date().getTime();
        // console.log(currentDate);
        // console.log(exp);

        if (exp <= currentDate) {
            return res.status(400).send({ msg: "The token has expired" });
        } else {
            req.user = payload;
            next();
        }

    } catch (error) {
        res.status(400).send({ msg: "Token invalid" });
    }

}

module.exports = {

    asureAuth,

}