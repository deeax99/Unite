const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Schema = new schema({
    email: String,
    password: String,
    username: String,
    loged: String,
    birthDate:Date
})

module.exports = mongoose.model("user", Schema);

