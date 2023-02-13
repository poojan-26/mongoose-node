const express = require('express')
const router = express.Router()
const upload = require('../api/utils/uploads')//for upload image
const checkAuth = require('../api/v1/middleware/check-auth')
const userController = require('../api/v1/controllers/users.controller');
const doctorController = require('../api/v1/controllers/docotors.controller');
const appointmentController = require('../api/v1/controllers/appointment.controller');
const doctorspecilizationController = require('../api/v1/controllers/doctorspecilization.controller');
const b_usersController = require('../api/v1/controllers/b_users.controller');
const sendmailController = require('../api/v1/controllers/sendmail.controller');
const forgotpasswordController =require('../api/v1/controllers/forgot-password.controller')

/* ********************************* here we have all users API ************************************ */
// Retrieve all users
router.get('/users', checkAuth, userController.getall);
// Create a new user
router.post('/createUser', userController.create);
// Retrieve a single user with id
router.get('/user/:id', checkAuth, userController.findOne);
// Update a user with id
router.put('/updateUser/:id', userController.updateuser);
// Create signup form 
router.post('/signUp/user', upload.single('user_image'),userController.signup);
//create signup for cloudinary
router.post('/signupUser',userController.signupUser)
//Create login for user
router.post('/signin/user', userController.signin)
// Delete a user with id
router.delete('/userDelete/:id', userController.delete);
//retrive user using pagination
router.get('/userPage', userController.userpage)


/*****************************************email sent API ********************************************* */
router.get('/sendemail', sendmailController.email)


/****************************************forgot password API ***************************************** */
router.post('/forgot-password', forgotpasswordController.forgotPassword)

router.get('/resetpassword/:id/:token', forgotpasswordController.getPasswordLink)

router.post('/resetpassword/:id/:token', forgotpasswordController.resetPassword)


/* ********************************* here we have all Doctors API ************************************ */
// Retrieve all doctors
router.get('/doctors', doctorController.getall);
// Create a new doctors
router.post('/createDoctor', doctorController.create);
// // Retrieve a single docor with id
router.get('/doctor/:id', doctorController.findOne);
// Update a doctor with id
router.put('/updateDoctor/:id', doctorController.updatedoctor);
// Create signup form 
router.post('/signUp/doctor', upload.single('doc_iamge'), doctorController.signup);
//create login for doctor
router.post('/signin/doctor', doctorController.signin)
// Delete a doctor with id
router.delete('/doctorDelete/:id', doctorController.delete);
//retrive doctor using pagination
router.get('/doctorPage', doctorController.doctorpage)


/* ********************************* here we have all Appointment API ************************************ */
// Retrieve all appointment
router.get('/appointments', appointmentController.getall);
// Create a new appointment
router.post('/createappointment', appointmentController.create);
// // Retrieve a single appointment with id
router.get('/appointment/:id', appointmentController.findOne);
// Update a appointment with id
router.put('/updateAppointment/:id', appointmentController.updateappointment);
// Delete a appointment with id
router.delete('/appointmentDelete/:id', appointmentController.delete);
//retrive appointment using pagination
router.get('/appointmentPage', appointmentController.appointmentpage);


/* ********************************* here we have all doctorspecilization API ************************************ */
// Retrieve all users
router.get('/specilizations', doctorspecilizationController.getall);
// Create a new user
router.post('/createSpecilization', doctorspecilizationController.create);
// Retrieve a single user with id
router.get('/specilization/:id', doctorspecilizationController.findOne);
// Update a user with id
router.put('/updateSpecilization/:id', doctorspecilizationController.updatespecilization);
// Delete a user with id
router.delete('/specilizationDelete/:id', doctorspecilizationController.delete);
//retrive appointment using pagination
router.get('/specilizationPage', doctorspecilizationController.specilizationpage);


/* ********************************* here we have all monthly API ************************************ */
// Retrieve all users
router.get('/b_users', b_usersController.getall);
//search by month
router.get('/month', b_usersController.getmonth);
// Create a new user
// router.post('/', userController.create);
// // Retrieve a single user with id
// router.get('/:id', userController.findOne);
// // Update a user with id
// router.put('/:id', userController.update);
// // Delete a user with id
// router.delete('/:id', userController.delete);



module.exports = router