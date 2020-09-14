const validate = new (require("../../Validation/validation"))();
const user = require("../../DB/modules/user")
const post = require('../../DB/modules/post')
const userFollwers = require('../../DB/modules/userFollwers')

const operations = require("../../DB/modify/operations")
const Ovalidate = new operations();


module.exports = class 
{
    static RegisterDB (RegisterData)
    {
        if (!validate.EmailValidatoinCheck(RegisterData["email"]))
        {
            return {result : false ,reason : "email format not valid"}
        }
        else if (!validate.StrongPassword(RegisterData["password"]))
        {
            return {result : false ,reason : "password is weak"}
        }
        else if (Ovalidate.exist(user , {email : RegisterData["email"] ,username : RegisterData["username"] })["result"]) 
        {
            return {result : false ,reason : "username or email is exist"}
        }
        else 
        {
            var registerDBData = {email : RegisterData["email"] ,
                          password : validate.Hash128(RegisterData["password"]) ,
                          username : RegisterData["username"] ,
                          birthDate : RegisterData["birthDate"]};
            
            Ovalidate.add(user , registerDBData)
            return {result : true};
        }
    } 
}