const Doctor = require('../models/doctors');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
const jwt = require('jsonwebtoken');

class hospitalHelper {

    async findall(req,res){
        try{
                const doctors = await Doctor.find()
               return doctors;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async create(body){
        try{
            const doctor = {
                            specilization: body.specilization,
                            doctorName: body.doctorName,
                            address: body.address,
                            docFees: body.docFees,
                            contactno: body.contactno,
                            docEmail: body.docEmail,
                            password: body.password,
                            creationdate: body.creationdate
                            }
                            const response =await new Doctor(doctor).save();
                            return response;   
        }catch (err){
                console.log(`there was an error ${err}`) 
                    }
    }


    async findOne(id){
     try{
                const doctor = await Doctor.findById({_id:id});
                console.log(doctor);
             return doctor;
        }catch (err){
             console.log(`there was an error ${err}`) 
             }
    }

    async updatedoctor(body, id){
        try{
            const doctor = {
                specilization: body.specilization,
                doctorName: body.doctorName,
                address: body.address,
                docFees: body.docFees,
                contactno: body.contactno,
                docEmail: body.docEmail,
                password: body.password,
                creationdate: body.creationdate
                }   
                const response = await Doctor.findOneAndUpdate(id, {$set:doctor}, {new: true});
                // console.log(id);
               return response;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async delete(id){
        try{
                // let id = req.params.id
                const user = await Doctor.deleteOne({_id:id});
                console.log(user);
                return user;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async signup(body){
        try{
                await bcrypt.hash(body.password, 10, function(err, hash){
                        if (err){
                                throw err;
                        }else{
                                let doc = new Doctor({
                                    specilization: body.specilization,
                                    doctorName: body.doctorName,
                                    address: body.address,
                                    docFees: body.docFees,
                                    contactno: body.contactno,
                                    docEmail: body.docEmail,
                                    password: hash,
                                    creationdate: body.creationdate
                                    })
                                    doc.save();
                                    return doc;
                        }
                })   
                 
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async signin(body){
        try{ 
                const docEmail = body.docEmail;
                const password = body.password;
                if (docEmail == "" || password == ""){
                        return ("Empty credential supplied");
                }
                const doc = await Doctor.find({docEmail:docEmail})
                 if (doc.length<1){
                         return ("doctor not exist");
                 }
                if (doc){

                        if(await bcrypt.compare(password, doc[0].password)){
                                const token = jwt.sign({specilization: doc[0].specilization,
                                        doctorName: doc[0].doctorName,
                                        address: doc[0].address,
                                        docFees: doc[0].docFees,
                                        contactno: doc[0].contactno,
                                        docEmail: doc[0].docEmail,
                                        creationdate: doc[0].creationdate},'secretkey',{ expiresIn:'24h'})
                                return ({specilization: doc[0].specilization,
                                        doctorName: doc[0].doctorName,
                                        address: doc[0].address,
                                        docFees: doc[0].docFees,
                                        contactno: doc[0].contactno,
                                        docEmail: doc[0].docEmail,
                                        creationdate: doc[0].creationdate,Token: token}); 
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