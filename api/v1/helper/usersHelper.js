const User = require('../models/users');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
const jwt = require('jsonwebtoken');


class hospitalHelper {

    async findall(req,res){
        try{
                const user = await User.find()
               return user;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async create(body){
        try{
                const user = {
                    fullName: body.fullName,
                    address: body.address,
                    city: body.city,
                    gender: body.gender,
                    email: body.email,
                    password: body.password,
                    creationdate: body.creationdate
                }
                const response =await new User(user).save();
                return response;   
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async findOne(id){
        try{
                const user = await User.findById({_id:id});
                console.log(user);
                return user;
                // console.log(id)
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async updateuser(body, id){
        try{
                const user = {
                        fullName: body.fullName,
                        address: body.address,
                        city: body.city,
                        gender: body.gender,
                        email: body.email,
                        password: body.password,
                        creationdate: body.creationdate
                    }
                const response = await User.findOneAndUpdate(id, {$set:user}, {new: true});
                return response
                // console.log(id);
               return response;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }


    async delete(id){
        try{
                // let id = req.params.id
                const user = await User.deleteOne({_id:id});
                console.log(user);
                return user;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }


// async signup(body){
//         try{
//                const user = User.find({email:body.email})
//                if(user){
//                        console.log("mail is already exist");
//                }else{
//                 await bcrypt.hash(body.password, 10, function(err, hash){
//                         if (err){
//                                 throw err;
//                         }else{
//                                 let user = new User({
//                                         fullName: body.fullName,
//                                         address: body.address,
//                                         city: body.city,
//                                         gender: body.gender,
//                                         email: body.email,
//                                         password: hash,
//                                         creationdate: body.creationdate
//                                     })
//                                     user.save();
//                                     return user;
//                         }
//                 })   
//                }   
//         }catch (err){
//                 console.log(`there was an error ${err}`) 
//                 }
//     }

    async signin(body){
        // try{
        //         // const email = body.email;
        //         // const password = body.password;
        //         // if (email == "" || password == ""){
        //         //         return("Empty credential supplied");
        //         // }
        //         // const user = User.find({email})
        //         // if(user.length<1){
        //         //         return("user not found");
        //         // }
        //         // if (await bcrypt.compare(password, user.password)){
        //         //         return ("Success");
        //         // }else{
        //         //         return ("not allowed");
        //         // }

                
        // }catch(err){
        //         console.log(`there was an error ${err}`)
        // }
// }

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




        
               // const email = body
                // const user = User.findOne({email})
                // if (user){
                //         bcrypt.compare(password, user.password,function (err, result){
                //                 if(err){
                //                         console.log(err);
                //                 }
                //                 if (result){
                //                         const token = jwt.sign({city: user.city},'secretkey',{ expiresIn:'1h'})
                //                         return token; 
                //                 }else{
                //                         console.log("password not match");
                //                 }
                //         })
                // }else{
                //         console.log("no user found");
                // }
                // if (user.length < 1){
                //         console.log("user is not exist");
                // }
                
                // bcrypt.compare(password, user.password, function (err, result){
                        // if(!result){
                        //         console.log("password not match");
                        // }

                        // const isMatch = await bcrypt.compare(password, user.password);
                        // if(isMatch){
                        //         console.log("incorrect password");
                        // }
                        //         const token = jwt.sign({city: user.city},'secretkey',{ expiresIn:'1h'})
                        //         return token
                        
                        
                        
                        // })
                // // const user = User.findOne({email})
                // // return user;
                // if (!email || !password){
                //         console.log("please provide email & password");
                // }
                // const user = User.find({$and: [{email}, {password}]})
                // if(user){
                //         // const fullName = user[0].fullName;
                //         const token = jwt.sign({city: user.city},'secretkey',{ expiresIn:'1h'})
                //         return token;
                // }
                // }


                // if (user.length < 1){
                //         console.log("user is not exist");
                // }
                // bcrypt.compare(password, user[0].password, function(err,result){
                //         if (!result){
                //                 console.log("password is not correct");
                //         }
                //         if (result){
                //                 const token = jwt.sign({fullName: user[0].fullName,
                //                                         address: user[0].address,
                //                                         city: user[0].city,
                //                                         gender: user[0].gender,
                //                                         email: user[0].email,
                //                                         creationdate: user[0].creationdate
                //                                 },
                //                                 'secretkey',
                //                                 {
                //                                         expiresIn:'1h'
                //                                 }
                //                                 )
                //                                 return ({fullName: user[0].fullName,
                //                                         address: user[0].address,
                //                                         city: user[0].city,
                //                                         gender: user[0].gender,
                //                                         email: user[0].email,
                //                                         creationdate: user[0].creationdate}, {token})
                //         }
                // })
         
                // const email = body.email;
                // const password = body.password;
                // let user =  await User.findOne({email});
                // if (user.length < 1){
                //         console.log("user not exist");
                // }
                // else{
                //         bcrypt.compare(password, user[0].password, function(err, result){
                //                 if (err){
                //                         console.log("auth failed"); 
                //                 }
                //                 if (result){
                //                     var token = jwt.sign ({fullName: user[0].fullName,
                //                                    address: user[0].address,
                //                                    city: user[0].city,
                //                                    gender: user[0].gender,
                //                                    email: user[0].email,
                //                                 //    password: password[0].password,
                //                                    creationdate: user[0].creationdate
                //                                 },
                //                                 'secret',
                //                                 {
                //                                         expiresIn:'1h'
                //                                 }
                //                                 )
                //                                 console.log("user found")
                //                                 return token;
                //                 }else{
                //                         console.log("auth fail");
                //                 }
                //         })
                // }




                // // bcrypt.compare(body.password, user[0].password, function(err, result){
                //         if (!result){
                //                 console.log("password is not match");
                //         }
                //         if (result){
                //                 const token = jwt.sign({fullName: user[0].fullName,
                //                                         address: user[0].address,
                //                                         city: user[0].city,
                //                                         gender: user[0].gender,
                //                                         email: user[0].email,
                //                                         creationdate: user[0].creationdate
                //                                 },
                //                                 'secretkey',
                //                                 {
                //                                         expiresIn:'1h'
                //                                 }
                //                                 );
                //                                 return token;   
                //         }
                // })
                // // if (!user){
                //         console.log("user is not exist");
                // }
                // const isMatch = await bcrypt.compare(password, user[0].password);
                // if (!isMatch){
                //         console.log("incorrect password");
                // }
                // const payload ={
                //         user:{
                //                 id:user.id
                //         }
                // };
                // jwt.sign(payload, "secretkey", {expiresIn:"1h"}, function(err, token){
                //         if (err){
                //                 throw err;
                //         }else{
                //                 return token;
                //         }
                // });
               

               // if (user){
                //        await bcrypt.compare(password, user[0].password, function(err, result){
                //                 if (err){
                //                         console.log(`there was an error ${err}`);
                //                 }
                //                 if (result){
                //                         let token = jwt.sign({fullname:user[0].fullname}, 'secretkey', {expiresIn:'1h'})
                //                         console.log(`Login successfull ${token}`);
                //                 }else{
                //                         console.log("password not match");
                //                 }
                //         })
                // }else{
                //         console.log("No user found...!")
                // }
        



                //        const user = User.find({email:body.email})
        //        if (user.length<1){
        //                return ("user not exist");
        //        }
        //        bcrypt.compare(body.password, user[0].password, function(err, result){
        //                 if (!result){
        //                         return ("Password not match");
        //                 }
        //                 if (result){
        //                 const token = jwt.sign({
        //                         fullName : user[0].fullName,                              
        //                         email : user[0].email,
        //                 },
        //                 'Secretkey',
        //                 {
        //                         expiresIn:"10h"
        //                 }
        //                 );
        //                 return (token);
        //                 }
        //        })
//                }catch (err){
//                 console.log(`there was an error ${err}`) 
//                 }
//     }
        //         const user = await  User.find({email:body.email})
        //         if (user.length<1){
        //                 console.log("user not found");
        //         }
        //        bcrypt.compare(body.password, user[0].password, function(err,result){
        //                if (!result){
        //                        console.log("password not match");
        //                }
        //                if (result){
        //                        const token = jwt.sign({
        //                         fullName: user[0].fullName,
        //                         address: user[0].address,
        //                         city: user[0].city,
        //                         gender: user[0].gender,
        //                         email: user[0].email,
        //                         password: user[0].password,
        //                         creationdate: user[0].creationdate,
        //                        },
        //                        'poojan', 
        //                        {
        //                                expiresIn:"24h"
        //                        }
        //                        );
        //                        return token;
        //                }

        //        })
//         }catch (err){
//                 console.log(`there was an error ${err}`) 
//                 }
//     }
                // var email = body.email
                // var password = body.password
                // const user =User.findOne({$or: [{fullname:email},{email:email}]})
                // if (user){
                //         bcrypt.compare(password, user[0].password, function(err, result){
                //                 if (err){
                //                         throw err;
                //                 }
                //                 if (result){
                //                         let token = jwt.sign({
                //                                 fullname:user[0].fullname,
                //                                 address:user[0].address,
                //                                 city:user[0].city,
                //                                 gender:user[0].gender,
                //                                 // email:user[0].email,
                //                                 creationdate:user[0].creationdate,
                //                                 createdAt:user[0].createdAt,
                //                                 updatedAt:user[0].updatedAt
                //                         }, 'Secretkey', {expiresIn:'1h'})
                //                         return token;
                //                 }else{
                //                         console.log("password not match");
                //                 }
                //         })
                // }else{
                //         console.log("user not found");
                // }
        //        const user = User.find({email:body.email}) 
        //        if (user.length<1){
        //                 console.log("user not found");
        //        }else{
        //         bcrypt.compare(body.password, user[0].password, function(err,result){
        //                 if (!result){
        //                         console.log("passwod is not match plz try again...!");
        //                 }
        //                 if (result){
        //                         const token = jwt.sign({
        //                                 fullName: user[0].fullName,
        //                                 address: user[0].address,
        //                                 city: user[0].city,
        //                                 gender: user[0].gender,
        //                                 email: user[0].email,
        //                                 creationdate: user[0].creationdate
        //                         },
        //                         'poojan',
        //                         {
        //                                 expiresIn:"24h"
        //                         }
        //                         );
        //                                 return token;
        //                 }
        //         })
        //        }
        






}
module.exports = new hospitalHelper()