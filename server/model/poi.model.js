/*
 * @Author: wayne
 * @Date: 2018-04-14 13:30:34
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-14 13:31:04
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


exports.PoiSchema = PoiSchema;
module.exports = mongoose.model('Poi', PoiSchema);
