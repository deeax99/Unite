const connect = require("./DB/connection/connect")
const operations =  require("./DB/modify/operations")
const user = require("./DB/modules/user")
const post = require('./DB/modules/post')
const userFollwers = require('./DB/modules/userFollwers')
const Ovalidate = new operations();
const express = require("express");
const bodyParser = require('body-parser')

var express_server = express();
express_server.use(bodyParser.urlencoded({ extended: false }));



express_server.get("/", (req, res)=>{
    res.end("hello cleint");
})


express_server.post("/login", (req, res)=>{
    email = req.body["email"];
    password = req.body["password"];
    Ovalidate.exist(user, {email: email, password: password}).then((result)=>{
        
    })
})


//note that by defulte the host is your ip in your router
const port = 3211;
express_server.listen(port, ()=>{
    console.log("listening...");
})


setTimeout(() => {
    
    // validate.exist(user, {email: "mahmoud.elrabee@gmail.com", password: "helloWorld", username: "Mahmoud Elrabee", loged: "yes"}).then((result)=>{
    //     console.log(result);
    // });

    // validate.add(user, {email: "mahmoud.elrabee@gmail.com", password: "helloWorld", username: "Mahmoud Elrabee", loged: "yes"}).then((result)=>{
    //     console.log(result);
    // });

    // validate.add(post, {
    //     numberOfUsers: 10,
    //     participants: [],
    //     auther: "deea",
    //     place: "jordan",
    //     date: new Date().getDate,
    //     description: "any thing",
    //     location: "String",
    //     state: true,
    // }).then((result)=>{
    //     console.log(result);
    // })

    // validate.modify(user, {email: "mahmoud.elrabee@gmail.com"}, {username: "hello"}).then((result)=>{
    //     console.log(result);
    // })

}, 1000);
