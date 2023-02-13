const responseHelper = require('../../utils/responseHelper');
const Doctorspe = require('../models/doctorspecilization');
// const codeHelper = require('../../utils/codeHelper');
const doctorspecilizationHelper = require('../helper/doctorspecilizationHelper');

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
            let doctorspec = await doctorspecilizationHelper.findall(req.body)
            responseHelper.success(res, 'GET_DOCTORSPECILIZATION_SUCCESS', req.headers.language, doctorspec)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async create(req, res) {
        try {
            let doctorspec = await doctorspecilizationHelper.create(req.body)
            responseHelper.success(res, 'ADD_DOCTORSPECILIZATION_SUCCESS', req.headers.language, doctorspec)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async findOne(req, res) {
        try {
            let id = req.params.id;
            let doctorspec = await doctorspecilizationHelper.findOne(id)
            responseHelper.success(res, 'GET_DOCTORSPECILIZATION_SUCCESS', req.headers.language, doctorspec)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    
    async updatespecilization(req, res) {
        try {
            let id = req.params.id;
            let users = await doctorspecilizationHelper.updatespecilization(req.body,id)
            responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id;
            let users = await doctorspecilizationHelper.delete(id)
            responseHelper.success(res, 'DELETE_SPECILIZATION_SUCCESS', req.headers.language, users)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async specilizationpage(req, res) {
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
            const special = await Doctorspe.find().limit(limit).skip(skip);
            console.log(special)
            // let users = await usersHelper.userpage(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, { total: special.length, page_no:page, Specilization:special })
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