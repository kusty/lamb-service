/*
 * @Author: wayne
 * @Date: 2018-04-17 13:16:45
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-03 13:52:26
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  user_id: {
    type: Number,
  },
  union_id: {
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
