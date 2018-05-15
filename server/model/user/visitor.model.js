/*
 * @Author: wayne
 * @Date: 2018-05-04 23:07:53
 * @Last Modified by: kusty
 * @Last Modified time: 2018-05-15 09:47:00
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const VisitorSchema = new Schema({
  wechat: {
    unionId: String,
    openId: String,
    avatarUrl: String,
    nickName: String,
    gender: Number,
    city: String,
    province: String,
    country: String,
  },
}, { versionKey: false });


exports.VisitorSchema = VisitorSchema;
module.exports = mongoose.model('Visitor', VisitorSchema);
