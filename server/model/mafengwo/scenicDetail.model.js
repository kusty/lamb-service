/*
 * @Author: wayne
 * @Date: 2018-04-01 13:01:33
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-13 10:22:14
 */


const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScenicDetailSchema = new Schema({
  poi_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  tel: {
    type: String,
  },
  location: {
    type: [Number],
    index: '2d',
  },
  price: {
    type: String,
  },
  open_time: {
    type: String,
  },
  summary: {
    type: String,
  },
  suggest_time: {
    type: String,
  },
  traffic: {
    type: String,
  },
});


exports.ScenicDetailSchema = ScenicDetailSchema;
module.exports = mongoose.model('ScenicDetail', ScenicDetailSchema);
