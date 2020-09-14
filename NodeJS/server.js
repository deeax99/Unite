const connect = require("./DB/connection/connect")
const operations =  require("./DB/modify/operations")
const user = require("./DB/modules/user")
const post = require('./DB/modules/post')
const userFollwers = require('./DB/modules/userFollwers')
const Ovalidate = new operations();
const validate = new (require("./Validation/validation"))();
const express = require("express");
const bodyParser = require('body-parser')
const RegisterFile = require("./DB/Register/Register");

var express_server = express();
express_server.use(bodyParser.urlencoded({ extended: false }));



express_server.get("/", (req, res)=>{
    res.end("hello cleint");
})


express_server.post("/login", (req, res)=>{
    
    var email = req.body["email"];
    var password = req.body["password"];
    Ovalidate.exist(user, {email: email, password: password}).then((result)=>{
        if(result["result"] === false)
            res.send({
                result: false,
                resone: "data not correct or something wrong please try again",
            });
        else{
            var hash = validate.Hash128(email+new Date().getMilliseconds);
            Ovalidate.modify(user, {email: email}, {hash: hash}).then((result)=>{
                if(result["result"] == false)
                {
                    res.send({
                        result: false,
                        resone: "something wrong"
                    })
                }else{
                    res.send({
                        result: true,
                        hash: hash,
                        resone: ""
                    })
                }
            })
            
        }
    })

})


//note that by defulte the host is your ip in your router
const port = 3214;
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

data = {email : "deea1887@yahoo.com" , username : "Deeax99" , password : "test12@flfl" , birthDate : Date.now() };
console.log(RegisterFile.RegisterDB(data));