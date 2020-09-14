const passwordStrength = require('check-password-strength')
const md5 = require('md5');
module.exports = class 
{
    EmailValidatoinCheck(email)
    {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegexp.test(email)
    }

    PasswordCheck (password)
    {
        return passwordStrength(password).value != 1
    }

    post(object)
    {

    }
    Hash128(text)
    {
        return md5(text)
    }

}
