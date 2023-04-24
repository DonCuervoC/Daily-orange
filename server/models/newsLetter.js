const mongoose = require("mongoose");

const NewsLetterSchemma = mongoose.Schema({

    email: {
        type: String,
        unique: true,
    },
    name: String,
    lastName: String,

});

module.exports = mongoose.model("Newsletter", NewsLetterSchemma);