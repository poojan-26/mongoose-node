// const promise = require('bluebird')
const jwt = require('jsonwebtoken')
// const uuidv1 = require('uuid/v1')

const config = require('./config')

class CodeHelper {
    getJwtToken(fullname, email, password) {
        try {
            let expirationTime = 15 * 60,
                sign = {
                    fullname: fullname,
                    email: email,
                    password: password  // 0: Customer 1: Executive 2:Supervisor 3:Top Supervisor 4: Sub Executive
                }
            let token = jwt.sign(sign, 'Secretkey', {expiresIn: expirationTime});
            return token
        } catch (error) {
            console.log(`there was an error ${error}`) 
        }
    }  



}
module.exports = new CodeHelper()
