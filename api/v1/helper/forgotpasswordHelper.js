const forgotpassword = require('../models/forgotpassword');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
// const saltRounds = 10;
const jwt = require('jsonwebtoken');


class hospitalHelper {

    async forgotPassword(body){
        try{
            const email = body.email;
            const fpass = await forgotpassword.find({email:email})
            // make user in database or not 
            if (fpass.length < 1){
                return ("user not found")
            }
            if (fpass){
                const token = jwt.sign({address: fpass[0].address,
                    city: fpass[0].city,
                    gender: fpass[0].gender,
                    email: fpass[0].email,
                    creationdate: fpass[0].creationdate},'secretkey',{ expiresIn:'24h'})
                    const link = `http://localhost:4000/resetpassword/${token}`


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
                      to: email, // list of receivers
                      subject: "this is email send API", // Subject line
                    //   text: `Hi pd how are you?  what are you doing ???`, // plain text body
                      html: `<b>Hello pd here is the link which you can reset yor password</b>
                      <p>${link}</p>`, // html body
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
            }
            // if user is in the database then create one time link (OTL) if user use this one time then can not use it second time 
            // valid for 15min(any time u want)




        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }


    async updateuser(body, id){
        try{
                const user = {
                    fullname: body.fullname,
                        address: body.address,
                        city: body.city,
                        gender: body.gender,
                        email: body.email,
                        password: body.password,
                        creationdate: body.creationdate
                    }
                const response = await User.findOneAndUpdate(id, {$set:user}, {new: true});
                // console.log(id);
               return response;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }




    async signin(body){
        try{ 
                const email = body.email;
                const password = body.password;
                if (email == "" || password == ""){
                        return ("Empty credential supplied");
                }
                const user = await User.find({email:email})
                 if (user.length<1){
                         return ("user not exist");
                 }
                if (user){

                        if(await bcrypt.compare(password, user[0].password)){
                                const token = jwt.sign({address: user[0].address,
                                        city: user[0].city,
                                        gender: user[0].gender,
                                        email: user[0].email,
                                        creationdate: user[0].creationdate},'secretkey',{ expiresIn:'24h'})
                                return ({address: user[0].address,
                                        city: user[0].city,
                                        gender: user[0].gender,
                                        email: user[0].email,
                                        creationdate: user[0].creationdate,Token: token}); 
                        } else{
                                return ("password is not correct");
                        }
                        
                }
                

                } catch (err){
                        console.log(`there was an error ${err}`) 
                        }
        }




        
        






}
module.exports = new hospitalHelper()