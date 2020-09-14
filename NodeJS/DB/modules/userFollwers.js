const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Schema = new schema({
    userID: [String],
})

module.exports = mongoose.model("userFollwers", Schema);