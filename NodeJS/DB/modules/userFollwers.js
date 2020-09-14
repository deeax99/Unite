const mongoose = require("mongoose");
const schema = mongoose.schema;

const Schema = new schema({
    userID: String,
})

module.exports = mongoose.model("userFollwers", Schema);

