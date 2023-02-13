const responseHelper = require('../../utils/responseHelper');
const Doctor = require('../models/doctors');
const bcrypt = require('bcrypt');
// const codeHelper = require('../../utils/codeHelper');
const doctorsHelper = require('../helper/doctorsHelper');

// Retrieve and return all users from the database.
// exports.findAll = (req, res) => {
// User.find()
//   .then(users => {
//   res.send(users);
// }).catch(err => {
//   res.status(500).send({
//   message: err.message || "Something went wrong while getting list of users."
// });
// });
// };

class Hospital {
    
    async getall(req, res) {
        try {
            let users = await doctorsHelper.findall(req.body)
            responseHelper.success(res, 'GET_DOCTOR_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async create(req, res) {
        try {
            let users = await doctorsHelper.create(req.body)
            responseHelper.success(res, 'ADD_DOCTOR_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async findOne(req, res) {
        try {
            let id = req.params.id;
            let doctor = await doctorsHelper.findOne(id)
            responseHelper.success(res, 'GET_DOCTOR_SUCCESS', req.headers.language, doctor)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id;
            let users = await doctorsHelper.delete(id)
            responseHelper.success(res, 'DELETE_DOCTOR_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    
    async updatedoctor(req, res) {
        try {
            let id = req.params.id;
            let users = await doctorsHelper.updatedoctor(req.body,id)
            responseHelper.success(res, 'EDIT_DOCTOR_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async doctorpage(req, res) {
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
            const doc = await Doctor.find().limit(limit).skip(skip);
            console.log(doc)
            // let users = await usersHelper.userpage(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, { total: doc.length, page_no:page, doctor:doc })
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
                let doc = {
                    specilization: req.body.specilization,
                    doctorName: req.body.doctorName,
                    address: req.body.address,
                    docFees: req.body.docFees,
                    contactno: req.body.contactno,
                    docEmail: req.body.docEmail,
                    password: hash,
                    doc_image:req.file.path,
                    creationdate: req.body.creationdate
                }
                new Doctor(doc).save();
                // const response =await new User(user).save();
                // return us;   
                responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, doc)
            }
            })            
        // }
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async signin(req, res) {
        try {
            let users = await doctorsHelper.signin(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, users)

        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }




}
module.exports = new Hospital()




