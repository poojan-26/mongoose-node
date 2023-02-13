const responseHelper = require('../../utils/responseHelper');
const User = require('../models/users');
// const path = require('path');
// const codeHelper = require('../../utils/codeHelper');
const usersHelper = require('../helper/usersHelper');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const upload = multer({dest: 'uploads'})
// const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userValidator = require('../validator/userValidator');
const codeHelper = require('../../utils/codeHelper')

cloudinary.config({ 
    cloud_name: 'poojan26', 
    api_key: '862128756678627', 
    api_secret: 'hMeSlD2IkHu2TiSYBn00dD-mOv8' 
  });

class Hospital {
    
    async getall(req, res) {
        try {
            let users = await usersHelper.findall(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


    async create(req, res) {
        try {
            let users = await usersHelper.create(req.body)
            responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async findOne(req, res) {
        try {
            let id = req.params.id;
            let users = await usersHelper.findOne(id)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    
    async updateuser(req, res) {
        try {
            let id = req.params.id;
            let users = await usersHelper.updateuser(req.body,id)
            responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    
    async delete(req, res) {
        try {
            let id = req.params.id;
            let users = await usersHelper.delete(id)
            responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async userpage(req, res) {
        try {
            let {page, size} =req.query;
            if (!page){
                page =1;
            }
            if (!size){
                size =1;
            }
            const limit = parseInt(size);
            const skip = (page - 1) * size;
            const user = await User.find().limit(limit).skip(skip);
            console.log(user)
            // let users = await usersHelper.userpage(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, { total: user.length, page_no:page, users:user })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


    async signup(req, res) {
        try {
            // const user = User.find({email:body.email})
            //    if(user){
            //            console.log("mail is already exist");
            //    }else{
           await bcrypt.hash(req.body.password, 10, function(err, hash){
            if (err){
                throw err;
            }else{
                let user = {
                    fullname : req.body.fullname,
                    address : req.body.address,
                    city    : req.body.city,
                    gender  : req.body.gender,
                    email   : req.body.email,
                    password    : hash,
                    user_image: req.file.path,
                    creationdate    : req.body.creationdate
                    
                }
                // if (req.file){
                //     User.user_image = req.file.path
                // }
                new User(user).save();
                // const response =await new User(user).save();
                // return us;   
                responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, user)
            }
            })            
        // }
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async signupUser(req, res) {
        try {
                  const file = req.files.user_image;
                  cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
                    console.log(result);
                    bcrypt.hash(req.body.password, 10, function(err, hash){
                        if (err){
                            throw err;
                        }else{
                            let user = {
                                fullname : req.body.fullname,
                                address : req.body.address,
                                city    : req.body.city,
                                gender  : req.body.gender,
                                email   : req.body.email,
                                password    : hash,
                                user_image: result.url,
                                creationdate    : req.body.creationdate
                                
                            }
                            // if (req.file){
                            //     User.user_image = req.file.path
                            // }
                            new User(user).save();
                            // const response =await new User(user).save();
                            // return us;   
                            responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, user)
                        }
                        })            
                    //

                  })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async signin(req, res) {
        try {
            let users = await usersHelper.signin(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)

        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
            //  let {email,passworrd} = req.body
            //  email = email.trim();
            //  password = password.trim();
             
            //  if (email == "" || password == ""){
            //     console.log("please enter email & password");
            //  }else{
            //      const user = User.find({email})
            //      if (user){
            //          const hashedPassword = user[0].password;
            //          bcrypt.compare(password, hashedPassword, function(err, result){
            //              if (result){
            //                   console.log("signin sussful");
            //              }else{
            //                  console.log
            //              }
            //          })
            //      }
            //  }

            // bcrypt.compare(password, user[0].password, function(err, result){
            //      if (!result){
            //           console.log("password not mtch")
            //      }
            //      if (result){
            //          const token = jwt.sign({ fullName: user[0].fullName,
            //                                 address: user[0].address,
            //                                 city: user[0].city,
            //                                 gender: user[0].gender,
            //                                 email: user[0].email,
            //                                 creationdate: user[0].creationdate
            //                             },
            //                             'secretkey',
            //                             {
            //                                 expiresIn:"1h"
            //                             }
            //                             );
            //                             responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, token)
            //      }
            // })
            // // let users = await usersHelper.signin(req.body)
            
        

    // async signin(req, res) {
    //     try {
    //         let users = await usersHelper.signin(req.body)
    //         responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, users)
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }

    // async signin(req, res) {
    //     try {
    //         await userValidator.validateSigninForm(req.body)
    //         let token,
    //             user = await userValidator.isUserWithEmailExist(req.body, false)
    //         await userValidator.validatePassword(req.body)
    //         if (user) {
    //             token = await codeHelper.getJwtToken(req.body)
    //         } 
    //         responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, user, { auth_token: token })
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }




}
module.exports = new Hospital()




// // Create and Save a new User
// exports.create = (req, res) => {
// // Validate request
// if(!req.body) {
//   return res.status(400).send({
//   message: "Please fill all required field"
// });
// }
// // Create a new User
// const user = new User({
//   first_name: req.body.first_name,
//   last_name: req.body.last_name,
//   email: req.body.last_name,
//   phone: req.body.last_name
// });
// // Save user in the database
// user.save()
//   .then(data => {
//   res.send(data);
// }).catch(err => {
//   res.status(500).send({
//   message: err.message || "Something went wrong while creating new user."
// });
// });
// };
// // Find a single User with a id
// exports.findOne = (req, res) => {
//  User.findById(req.params.id)
//   .then(user => {
//   if(!user) {
//    return res.status(404).send({
//    message: "User not found with id " + req.params.id
//  });
// }
//  res.send(user);
// }).catch(err => {
//   if(err.kind === 'ObjectId') {
//     return res.status(404).send({
//     message: "User not found with id " + req.params.id
//   });
// }
// return res.status(500).send({
//   message: "Error getting user with id " + req.params.id
// });
// });
// };
// // Update a User identified by the id in the request
// exports.update = (req, res) => {
// // Validate Request
// if(!req.body) {
//   return res.status(400).send({
//   message: "Please fill all required field"
// });
// }
// // Find user and update it with the request body
// User.findByIdAndUpdate(req.params.id, {
//   first_name: req.body.first_name,
//   last_name: req.body.last_name,
//   email: req.body.last_name,
//   phone: req.body.last_name
// }, {new: true})
// .then(user => {
//  if(!user) {
//    return res.status(404).send({
//    message: "user not found with id " + req.params.id
//  });
// }
// res.send(user);
// }).catch(err => {
// if(err.kind === 'ObjectId') {
//   return res.status(404).send({
//   message: "user not found with id " + req.params.id
// });
// }
// return res.status(500).send({
//   message: "Error updating user with id " + req.params.id
// });
// });
// };
// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
// User.findByIdAndRemove(req.params.id)
// .then(user => {
// if(!user) {
//   return res.status(404).send({
//   message: "user not found with id " + req.params.id
// });
// }
// res.send({message: "user deleted successfully!"});
// }).catch(err => {
// if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//   return res.status(404).send({
//   message: "user not found with id " + req.params.id
// });
// }
// return res.status(500).send({
//   message: "Could not delete user with id " + req.params.id
// });
// });
// };