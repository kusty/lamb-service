/*
 * @Author: kusty
 * @Date: 2018-05-13 22:06:10
 * @Last Modified by: kusty
 * @Last Modified time: 2018-05-15 11:01:44
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const LoginSchema = new Schema({
  avatar: String,
  name: String,
  nickName: String,
  mobile: String,
  gender: Number,
  address: String,
  age: Number,
  summary: String,
  unionId: String,
  openId: String,
  province: String,
  city: String,
  country: String,
}, { versionKey: false });

exports.LoginSchema = LoginSchema;
module.exports = mongoose.model('Login', LoginSchema);
