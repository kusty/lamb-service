/*
 * @Author: wayne
 * @Date: 2018-03-30 17:03:57
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-13 10:22:21
 */


const mongoose = require('mongoose');

const { Schema } = mongoose;
/**
 * 景区表
 */
const ScenicSchema = new Schema({
  pro_id: {
    type: Number,
  },
  pro_name: {
    type: String,
  },
  summary: {
    type: String,
  },
  location: {
    type: [Number],
    index: '2d',
  },
  city_id: {
    type: Number,
  },
  city_name: {
    type: String,
  },
  area_id: {
    type: Number,
  },
  area_name: {
    type: String,
  },
  content: {
    type: String,
  },
  address: {
    type: String,
  },
  price_list: {
    type: Array,
  },
  price: {
    type: String,
  },
  name: {
    type: String,
  },
  coupon: {
    type: String,
  },
  img_list: {
    type: Array,
  },
  attention: {
    type: String,
  },

});

// ScenicSchema
//   .virtual('info')
//   .get(function () {
//     return {
//       _id: this._id,
//       name: this.name,
//     };
//   });


exports.ScenicSchema = ScenicSchema;
module.exports = mongoose.model('Scenic', ScenicSchema);
