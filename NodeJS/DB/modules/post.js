const mongoose = require("mongoose");
const schema = mongoose.schema;

const Schema = new schema({
    numberOfUsers: Number,
    participants: [String],
    auther: String,
    place: String,
    date: String,
    description: String,
    location: String,
    state: Boolean,
})

module.exports = mongoose.model("post", schema);

