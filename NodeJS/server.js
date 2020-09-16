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

function isAuth(userToCheck){
    return new Promise((resolve, reject)=>{
        Ovalidate.exist(user, userToCheck).then((result)=>{
            resolve(result['result']);
        })
    })
}

express_server.post("/register", (req, res)=>
{
    var body = req.body;
    if (!validate.EmailValidatoinCheck(body["email"]))
    {
        res.send({result : false ,reason : "email format not valid" })
    }
    else if (!validate.StrongPassword(body["password"]))
    {
        res.send({result : false ,reason : "password is weak" })
    }
    else
    {
        var registerData = {email : body["email"] ,username : body["username"] };
        Ovalidate.exist(user , registerData).then( (result)=>
        {
            if (result["result"] == false)
            {
                var registerDBData = {
                                    email : body["email"] ,
                                    password : validate.Hash128(body["password"]) ,
                                    username : body["username"] ,
                                    birthDate : body["birthDate"]};

                Ovalidate.add(user , registerDBData).then((result) =>
                {
                    res.send(result);
                })
            }
            else 
            {
                res.send({result : false ,reason : "username or email is exist" })
            }
        })
               
    }
})

express_server.post("/login", (req, res)=>
{
    var email = req.body["email"];
    var password = validate.Hash128(req.body["password"]);
    console.log(email, password);
    Ovalidate.exist(user, {email: email, password: password}).then((result)=>{
        if(result["result"] === false)
            res.send({
                result: false,
                resone: "data not correct or something wrong please try again",
            });
        else{
            var hash = validate.Hash128(email+new Date().getMilliseconds);
            Ovalidate.modify(user, {email: email}, {loged: hash}).then((result)=>{
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



//this function responsibile for follow and un follow users
function changefollow(email, userToAdd){
    return new Promise((resolve, reject)=>{
        Ovalidate.exist(user, userToAdd).then((result)=>{
            if(result['result'] === false){
                resolve({
                    result: false,
                    resone: 'user to add does not exist',
                })
            }else{
                Ovalidate.get(userFollwers, {email: email}).then((currentFollowers)=>{
                    if(currentFollowers['result'] === false){
                        Ovalidate.add(userFollwers, {email: email, followers: [userToAdd.email]}).then((ans)=>{
                            if(ans['result'] === false){
                                resolve({
                                    result: false,
                                    resone: 'cant create user followers array',
                                })
                            }else{
                                resolve({
                                    result: true,
                                    resone: '',
                                })
                            }
                        })
                    }else{
                        Ovalidate.get(userFollwers, {email: email}).then((userFollwersObject)=>{
                            userFollwersObject = userFollwersObject.object;
                            var findOne = userFollwersObject.followers.indexOf(userToAdd.email);
                            if(findOne == -1)
                            {
                                userFollwersObject.followers.push(userToAdd.email);
                            }else{
                                userFollwersObject.followers.splice(findOne, 1);
                            }
                            Ovalidate.modify(userFollwers, {email: email}, userFollwersObject).then((ans)=>{
                                if(ans['result'] === false){
                                    resolve({
                                        result: false,
                                        resone: 'cant modify user followers array',
                                    })
                                }else{
                                    resolve({
                                        result: true,
                                        resone: '',
                                    })
                                }
                            })
                        })
                    }
                })
            }
        })
    })
}

express_server.post("/insertPost", (req, res)=>{
    
    var email = req.body['email'];
    var hash = req.body['hash'];
    var realPost = {
        name: req.body['name'],
        numberOfUsers: req.body['numberOfUsers'],
        participants: [],
        auther: email,
        place: req.body['place'],
        date: req.body['date'],
        description: req.body['description'],
        location: req.body['location'],
        state: true
    }
    
    isAuth({email: email, loged: hash}).then((ans)=>{
        if(ans == false){
            res.send({
                result: false,
                resone: 'you are not loged',
            })
        }else{
            Ovalidate.add(post, realPost).then((result)=>{
                res.send(result);
            })
        }
    })



})

function changeParti(email, postID){
    return new Promise((resolve, reject)=>{
        Ovalidate.get(post, {_id: postID}).then((result)=>{
            if(result['result'] === false){
                resolve({
                    result: false,
                    resone: 'there is no post with this id',
                })
            }else{
                var currentPost = result.object;
                var findOne = currentPost.participants.indexOf(email);
                if(findOne == -1)
                    currentPost.participants.push(email);
                else
                    currentPost.participants.splice(findOne, 1);
                console.log(currentPost.participants);
                Ovalidate.modify(post, {_id: postID}, currentPost).then((ans)=>{
                    if(ans['result'] === false){
                        resolve({
                            result: false,
                            resone: 'cant modify post participants array',
                        })
                    }else{
                        resolve({
                            result: true,
                            resone: '',
                        })
                    }
                })
            }
        })
    })
    
}

express_server.post('/participants', (req, res)=>{
    
    var email = req.body['email'];
    var hash = req.body['hash'];
    var postID = req.body['postID'];

    isAuth({email: email, loged: hash}).then((ans)=>{
        if(ans == false){
            res.send({
                result: false,
                resone: 'you are not loged',
            })
        }else{

            changeParti(email, postID).then((result)=>{res.send(result)});
            
        }
    })

})

function getPost(postStart){

    return new Promise((resolve, reject)=>{

        Ovalidate.getFrom(post, postStart).then((result)=>resolve(result));

    })

}

express_server.post("/getPost", (req, res)=>{

    var email = req.body['email'];
    var hash = req.body['hash'];
    var postStart = req.body['postStart'];

    isAuth({email: email, loged: hash}).then((ans)=>{
        if(ans == false){
            res.send({
                result: false,
                resone: 'you are not loged',
            })
        }else{

            getPost(postStart).then((result)=>{res.send(result)});
            
        }
    })

})



//this function can change the folloing state
express_server.post("/follow", (req, res)=>{

    var email = req.body['email'];
    var hash = req.body['hash'];
    var userToAdd = {email: req.body['user']};

    isAuth({email: email, loged: hash}).then((ans)=>{
        if(ans == false){
            res.send({
                result: false,
                resone: 'you are not loged',
            })
        }else{
            changefollow(email, userToAdd).then((result)=>res.send(result));
        }
    })

})


express_server.post("/updateSetting", (req, res)=>{
    //todo
})

express_server.post("/editPost", (req, res)=>{
    //todo
})

//note that by defulte the host is your ip in your router
const port = 80;
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

// data = {email : "wdasw@yahoo.com" , username : "Deeax99" , password : "test12@flfl" , birthDate : Date.now() };
// console.log(RegisterFile.RegisterDB(data));