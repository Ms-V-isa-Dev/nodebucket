/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/24/2020
 * Description: Employee js
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**employee schema, sprint 1 */

let employeeSchema = new Schema({
  empId: { type: String, unique: true, dropDups: true },//good practice
  firstName: { type: String },
  lastName: { type: String }
},{ collection: 'employees' })

module.exports = mongoose.model('Employee', employeeSchema);
