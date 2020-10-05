/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/28/2020
 * Description: Employee js
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = require('./item');

/**employee schema, sprint 1 */
let employeeSchema = new Schema({
  empId:        { type: String, unique: true, dropDups: true },//good practice
  firstName:    { type: String },
  lastName:     { type: String },
  todo:         [Item],// creating nested collections of data to pull back
  done:         [Item]
},{ collection: 'employees' })

module.exports = mongoose.model('Employee', employeeSchema);
