// const db = require('../../utils/db')
// const bcrypt = require('bcryptjs');
const User = require('../models/users');
// const promise = require('bluebird')
const bcrypt = require('bcrypt');
const joi = require('joi')
const joiValidator = require('../../utils/joiValidator')

/**
 * This UserAuthValidator class contains all customer account related API's validation. This class' functions are called from userAuth controller.
 */

class UserAuthValidator {
   
    async validateSigninForm(body) {
        try {
            let schema = joi.object().keys({
                fullName: joi.string().required(),
                address: joi.string().required(),
                city: joi.string().required(),
                gender: joi.string().required(),
                email: joi.string().required(),
                password: joi.string().required(),
                creationdate: joi.string().required(),
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            console.log(`there was an error ${error}`) 
        }
    }
    async validatePassword(body) {
        try {
            const user = User.find({email:body.email})
            bcrypt.compare(body.password,user[0].password,function(err, result){
                if (!result) {
                    throw 'INCORRECT_PASSWORD'
                }
                if (result){
                    return result;
                }
            })
           
            return true
        } catch (error) {
            console.log(`there was an error ${error}`) 
        }
    }
    async validateOldPassword(db_password, body_password) {
        try {
            if (db_password != body_password) {
                throw 'INCORRECT_OLD_PASSWORD'
            }
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateForgotPasswordForm(body) {
        try {
            let schema = joi.object().keys({
                country_code: joi.string().required(),
                phone_number: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateCheckLinkForm(body) {
        try {
            let schema = joi.object().keys({
                guid: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateResetPasswordForm(body) {
        try {
            let schema = joi.object().keys({
                new_password: joi.string().required(),
                country_code: joi.string().required(),
                phone_number: joi.string().required(),
                otp: joi.number().integer().required()            
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateChnagePasswordForm(body) {
        try {
            let schema = joi.object().keys({
                old_password: joi.string().required(),
                new_password: joi.string().required(),
                user_id: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }    
    async validateEditProfileForm(body) {
        try {
            let schema = joi.object().keys({
                user_id: joi.required(),
                full_name: joi.string().required(),
                email: joi.string().email().allow(''),
                age: joi.number().integer().allow(''),
                gender: joi.number().integer().allow('')                
            })            
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateChangeMobileNumberForm(body) {
        try {
            let schema = joi.object().keys({
                user_id: joi.required(),
                iso: joi.string().required(),
                country_code: joi.string().required(),
                phone_number: joi.string().required()              
            })            
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async verifyOTPForMobileChangeForm(body) {
        try {
            let schema = joi.object().keys({
                user_id: joi.required(),
                iso: joi.string().required(),
                country_code: joi.string().required(),
                phone_number: joi.string().required(),
                otp: joi.number().integer().required()
            })            
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }

    async isUserWithEmailExist(body, throw_error_for_exists) {
        try {
               let  user = await User.find({email: body.email})
            if (throw_error_for_exists) {
                if (user.length < 1) {
                    throw 'USER_WITH_EMAIL_NOT_FOUND'
                } 
            } 
        } catch (error) {
            console.log(`there was an error ${error}`) 
        }
    }
    async validateDeleteUserDeviceRelationForm(body) {
        try {
            let schema = joi.object().keys({
                user_id: joi.required(),
                device_id: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new UserAuthValidator()