const Newsletter = require("../models/newsLetter");

//Functions
async function subscribe(req, res) {

    const { email, name, lastName } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ msg: 'Please enter a valid email address' });
    }

    const newSubscriber = new Newsletter({
        email: email.toLowerCase(),
        name: name ? name : undefined,
        lastName: lastName ? lastName : undefined
    });

    try {
        await newSubscriber.save();
        res.status(201).json({ msg: "Subscriber created successfully", newSubscriber });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error saving subscriber" });
    }
}


module.exports = {

    subscribe,

};