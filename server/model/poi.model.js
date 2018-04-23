/*
 * @Author: wayne
 * @Date: 2018-04-14 13:30:34
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-23 11:03:03
 */


const mongoose = require('mongoose');

const { Schema } = mongoose;

const PoiSchema = new Schema({
  poi_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  head_img: {
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
}, { versionKey: false });


exports.PoiSchema = PoiSchema;
module.exports = mongoose.model('Poi', PoiSchema);
