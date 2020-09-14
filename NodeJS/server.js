const connect = require("./DB/connection/connect")
const operations =  require("./DB/modify/operations")
const user = require("./DB/modules/user")

setTimeout(() => {
    

    
    // new operations().exist(user, {email: "mahmoud.elrabee@gmail.com", password: "helloWorld", username: "Mahmoud Elrabee", loged: "yes"}).then((result)=>{
    //     console.log(result);
    // });

    // new operations().add(user, {email: "mahmoud.elrabee@gmail.com", password: "helloWorld", username: "Mahmoud Elrabee", loged: "yes"}).then((result)=>{
    //     console.log(result);
    // });

    // new operations().modify(user, {username: "now Mahmoud is Here"}, {username: "iam not here"}).then((result)=>{
    //     console.log(result);
    // })


}, 1000);
