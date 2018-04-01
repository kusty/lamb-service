/*
 * @Author: wayne 
 * @Date: 2018-03-30 17:03:57 
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-01 09:29:57
 */

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
/** 
 * 景区表
 */
let ScenicSchema = new Schema({
  pro_id: {
    type: Number
  },
  pro_name: {
    type: String
  },
  summary: {
    type: String
  },
  location: {
    type: [Number],
    index: "2d"
  },
  city_id: {
    type: Number
  },
  city_name: {
    type: String
  },
  area_id: {
    type: Number
  },
  area_name: {
    type: String
  },
  content: {
    type: String
  },
  address: {
    type: String,
  },
  price_list: {
    type: Array
  },
  price: {			//访问数
    type: String,
  },
  name: {		//评论数
    type: String,
  },
  coupon: {
    type: String,
  },
  img_list: {				//0:草稿 1:发布
    type: Array,
  },
  attention: {
    type: String,
  },

})

ScenicSchema
  .virtual('info')
  .get(function () {
    return {
      '_id': this._id,
      'name': this.name,
    }
  })

exports.ScenicSchema = ScenicSchema
module.exports = mongoose.model('Scenic', ScenicSchema)