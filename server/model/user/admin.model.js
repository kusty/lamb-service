/*
 * @Author: wayne
 * @Date: 2018-04-17 14:23:16
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-20 15:10:26
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  userid: {
    type: Number,
  },
  account: {
    type: String,
  },
  password: {
    type: String,
  },
}, { versionKey: false });

exports.AdminSchema = AdminSchema;
module.exports = mongoose.model('Admin', AdminSchema);
