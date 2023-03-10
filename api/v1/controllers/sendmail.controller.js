const responseHelper = require('../../utils/responseHelper');
const User = require('../models/users');
const usersHelper = require('../helper/usersHelper');
const nodemailer = require("nodemailer");
const { getMaxListeners } = require('../models/users');

class Hospital {
    
    async email(req, res) {
        try {
            // async..await is not allowed in global scope, must use a wrapper
              // Generate test SMTP service account from ethereal.email
              // Only needed if you don't have a real mail account for testing
              let testAccount = await nodemailer.createTestAccount();
            
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                  user: 'pujancdhorajiya2000@gmail.com', // generated ethereal user
                  pass: 'Poojan@26', // generated ethereal password
                },
              });
            
              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: '"Poojan 👻" <pujancdhorajiya2000@gmail.com>', // sender address
                to: "dhorajiyapoojan@gmail.com", // list of receivers
                subject: "this is email send API", // Subject line
                text: `Hi pd how are you?  what are you doing ???`, // plain text body
                // html: "<b>Hello world?</b>", // html body
              });
              if (info.messageId){
                  res.send("email sent successfully...!");
              }else{
                  res.send("Error with sending email");
              }
              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


   



}
module.exports = new Hospital()



