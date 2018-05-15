/*
 * @Author: wayne
 * @Date: 2018-04-17 13:16:45
 * @Last Modified by: kusty
 * @Last Modified time: 2018-05-15 09:46:57
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: Number,
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
}, { versionKey: false });

exports.UserSchema = UserSchema;
module.exports = mongoose.model('User', UserSchema);
