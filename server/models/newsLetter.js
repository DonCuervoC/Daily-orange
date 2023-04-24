const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NewsLetterSchemma = mongoose.Schema({

    email: {
        type: String,
        unique: true,
    },
    name: String,
    lastName: String,

});

NewsLetterSchemma.plugin(mongoosePaginate);

module.exports = mongoose.model("Newsletter", NewsLetterSchemma);