const responseHelper = require('../../utils/responseHelper');
const appointment = require('../models/appointment');
// const codeHelper = require('../../utils/codeHelper');
const appointmentHelper = require('../helper/appointmentHelper');

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
            let users = await appointmentHelper.findall(req.body)
            responseHelper.success(res, 'GET_APPOINTMENT_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async create(req, res) {
        try {
            let users = await appointmentHelper.create(req.body)
            responseHelper.success(res, 'ADD_APPOINTMENT_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async findOne(req, res) {
        try {
            let id = req.params.id;
            let doctor = await appointmentHelper.findOne(id)
            responseHelper.success(res, 'GET_DOCTOR_SUCCESS', req.headers.language, doctor)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async updateappointment(req, res) {
        try {
            let id = req.params.id;
            let users = await appointmentHelper.updateappointment(req.body,id)
            responseHelper.success(res, 'EDIT_APPOINTMENT_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    
    async delete(req, res) {
        try {
            let id = req.params.id;
            let users = await appointmentHelper.delete(id)
            responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async appointmentpage(req, res) {
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
            const appoint = await appointment.find().limit(limit).skip(skip);
            console.log(appoint)
            // let users = await usersHelper.userpage(req.body)
            responseHelper.success(res, 'GET_APPOINTMENT_SUCCESS', req.headers.language, { total: appoint.length, page_no:page, Appointment:appoint })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }



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