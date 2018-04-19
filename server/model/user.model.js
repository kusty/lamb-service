/*
 * @Author: wayne
 * @Date: 2018-04-17 13:16:45
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-19 15:00:00
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  gender: {
    type: Number,
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  summary: {
    type: String,
  },
});


exports.UserSchema = UserSchema;
module.exports = mongoose.model('User', UserSchema);
