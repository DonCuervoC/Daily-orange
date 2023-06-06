const Newsletter = require("../models/newsLetter");
const validator = require('validator');


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

async function getSuscribers(req, res){

    const { page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    Newsletter.paginate({}, options, (error, emailsStored) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener los emails" });
        } else {
            res.status(200).send(emailsStored);
        }
    })
}

async function deleteSuscriberByID(req, res) {

    try {

      const { id } = req.params;
      await Newsletter.findByIdAndDelete(id);
      res.status(200).json({ msg: "Suscriber was deleted" });
      
    } catch (error) {
      res.status(400).json({ msg: "Error while deleting suscriber" });
    }
  }


module.exports = {

    subscribe,
    getSuscribers,
    deleteSuscriberByID,

};