const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 4000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


//add single line access the file publicly
app.use('/uploads', express.static('uploads'))

//to upload image cloudinary use express-fileupload
app.use(fileUpload({
  useTempFiles:true
}))

// Configuring the database
const dbConfig = require('./api/utils/config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {useNewUrlParser: true,useUnifiedTopology: true}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

app.use(express.json());
//import theater_db routes
const hospitalRoutes = require('./routes/hospital.routes');

//create routes(middleware)
app.use('/hospital/v1', hospitalRoutes)


// define a root/default route
// app.get('/', (req, res) => {
//    res.json({"message": "Hello World"});
// });

// listen for requests
app.listen(port, () => {
   console.log(`Node server is listening on port ${port}`);
});