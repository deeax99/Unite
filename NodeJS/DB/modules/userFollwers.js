const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Schema = new schema({
    email: String,
    followers: [String],
})

module.exports = mongoose.model("userFollwers", Schema);