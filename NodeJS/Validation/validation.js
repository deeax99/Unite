const passwordStrength = require('check-password-strength')
const md5 = require('md5');
module.exports = class 
{
    EmailValidatoinCheck(email)
    {
        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        return emailRegex.test(email)
    }

    PasswordStrength (password)
    {
        return passwordStrength(password).id != 0
    }

    post(object)
    {

    }

    Hash128(text)
    {
        return md5(text)
    }

    

}
