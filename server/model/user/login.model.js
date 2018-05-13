/*
 * @Author: kusty
 * @Date: 2018-05-13 22:06:10
 * @Last Modified by:   kusty
 * @Last Modified time: 2018-05-13 22:06:10
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const LoginSchema = new Schema({
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


exports.LoginSchema = LoginSchema;
module.exports = mongoose.model('Login', LoginSchema);
