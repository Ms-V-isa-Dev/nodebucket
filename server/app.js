/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/24/2020
 * Description: App js
 */

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/employee');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://superadmin:s3cret@cluster0-lujih.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
 // do this if you have 1 api

 // use the mongoose employee model to query MongoDB Atlas by employee id
 app.get('/api/employees/:empId', async(req, res) => {
   try {

    // use employee model to query db to pull employee record to match route parameter
     Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      // if there is a database level error, handle by the server 500 error
       if (err) {
         console.log(err);// returns the db only
         res.status(500).send({
        'message': 'Internal server error!'
     })
    } else {
      // if there are no database level errors, return the employee object {}
      console.log(employee);
      res.json(employee);
    }
  })

   } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error!'
    })
   }
 })
/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
