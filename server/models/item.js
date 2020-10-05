/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/28/2020
 * Description: Item js
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;// we used this again so we can instantiate a new schema

 let itemSchema = new Schema({
   text: { type: String }
 });

 module.exports = itemSchema;
