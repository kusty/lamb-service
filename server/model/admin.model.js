/*
 * @Author: wayne
 * @Date: 2018-04-17 14:23:16
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-19 14:59:56
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  id: {
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

exports.AdminSchema = AdminSchema;
module.exports = mongoose.model('Admin', AdminSchema);
