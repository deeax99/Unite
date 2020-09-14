const mongo = require("mongoose");

var url = "mongodb://localhost:27017/Unite"
mongo.connect(url, { useUnifiedTopology: true, useNewUrlParser: true}, (err)=>{
    console.log("connection done");
})