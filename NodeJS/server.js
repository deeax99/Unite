const connect = require("./DB/connection/connect")
const operations =  require("./DB/modify/operations")
const user = require("./DB/modules/user")
const post = require('./DB/modules/post')

setTimeout(() => {
    
    // new operations().exist(user, {email: "mahmoud.elrabee@gmail.com", password: "helloWorld", username: "Mahmoud Elrabee", loged: "yes"}).then((result)=>{
    //     console.log(result);
    // });

    // new operations().add(user, {email: "mahmoud.elrabee@gmail.com", password: "helloWorld", username: "Mahmoud Elrabee", loged: "yes"}).then((result)=>{
    //     console.log(result);
    // });

    // new operations().add(post, {
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

    // new operations().modify(user, {email: "mahmoud.elrabee@gmail.com"}, {username: "hello"}).then((result)=>{
    //     console.log(result);
    // })


}, 1000);
