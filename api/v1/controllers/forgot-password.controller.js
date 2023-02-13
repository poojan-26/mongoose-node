const responseHelper = require('../../utils/responseHelper');
const forgotpassword = require('../models/forgotpassword');
const _ = require('lodash'); 
const jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");
// const path = require('path');
// const codeHelper = require('../../utils/codeHelper');
const forgotpasswordHelper = require('../helper/forgotpasswordHelper');
const bcrypt = require('bcrypt');


class Hospital {
    
    async forgotPassword(req, res) {
        try{
            const email = req.body.email;
            const fpass = await forgotpassword.find({email:email})
            // make user in database or not 
            if (fpass.length < 1){
                console.log("user not found")
            }
            // if (fpass){
            //     const token = jwt.sign({city: fpass[0].city,
            //         gender: fpass[0].gender,
            //         email: fpass[0].email,
            //         creationdate: fpass[0].creationdate},'secretkey',{ expiresIn:'24h'})
            //         const link = `http://localhost:4000/hospital/v1/resetpassword/${fpass[0].id}/${token}`


            //         // let testAccount = await nodemailer.createTestAccount();
            
            //         // create reusable transporter object using the default SMTP transport
            //         let transporter = nodemailer.createTransport({
            //           service:'gmail',
            //           auth: {
            //             user: 'pujancdhorajiya2000@gmail.com', // generated ethereal user
            //             pass: 'Poojan@26', // generated ethereal password
            //           },
            //         });
                  
            //         // send mail with defined transport object
            //         let info = await transporter.sendMail({
            //           from: '"Poojan 👻" <pujancdhorajiya2000@gmail.com>', // sender address
            //           to: email, // list of receivers
            //           subject: "this is email send API", // Subject line
            //         //   text: `Hi pd how are you?  what are you doing ???`, // plain text body
            //           html: `<b>Hello pd here is the link which you can reset yor password</b>
            //           <p>${link}</p>`, // html body
            //         });
            //         if (info.messageId){
            //             res.send("Password reset link has been sent to your email...!");
            //         }else{
            //             res.send("Error with sending email");
            //         }
            //         const user = forgotpassword.updateOne({resetLink: token}, function(err, success){
            //             if(err){
            //                 return res.status(400).json({error:"reset password link error"})
            //             }else{
            //                 new forgotpassword(user).save();
            //             }
            //         })
            //     }
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


    async getPasswordLink(req, res) {
        try {
          const { id, token } = req.params;
            res.send(req.params)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }



    async resetPassword(req, res) {
        try {
            const {id, token} = req.params;
            const {password} = req.body;
           if(id){
            const verify = jwt.verify(token, 'secretkey');
            const fp = await forgotpassword.updateOne({$set:{password}})
            responseHelper.success(res, 'PASSWORD_CHANGE', req.headers.language, fp)
           }
            // if(id.length<1){
            //     res.send("invalid id...")
            //     return;
            // }
            //  const verify = jwt.verify(token, 'secretkey');
            // forgotpassword.password = password;
            // return verify;

            // if(user.length<1){
            //     res.send("invalid id...")
            // }
            // const verify = jwt.verify(token, 'secretkey');
            // user.password =password
            // res.send(user);
            
            // responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }




}
module.exports = new Hospital()
