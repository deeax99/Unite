const passwordStrength = require('check-password-strength')
const md5 = require('md5');
module.exports = class 
{
    EmailValidatoinCheck(email)
    {
        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        return emailRegex.test(email)
    }

    StrongPassword (password)
    {
        return password.length > 7;
        return passwordStrength().id != 0
    }

    post(object)
    {

    }

    Hash128(text)
    {
        return md5(text)
    }

    

}
