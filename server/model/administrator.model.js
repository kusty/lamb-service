/*
 * @Author: wayne
 * @Date: 2018-04-17 14:23:16
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-18 10:01:55
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdministratorSchema = new Schema({
  userid: {
    type: Number,
  },
  name: {
    type: String,
  },
  account: {
    type: String,
  },
  password: {
    type: String,
  },
});


exports.AdministratorSchema = AdministratorSchema;
module.exports = mongoose.model('Administrator', AdministratorSchema);
