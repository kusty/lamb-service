/*
 * @Author: wayne
 * @Date: 2018-04-17 13:16:45
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-04 16:10:48
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  nickName: {
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
  wechat: {
    unionId: String,
    openId: String,
  },
});


exports.UserSchema = UserSchema;
module.exports = mongoose.model('User', UserSchema);
