/*
 * @Author: wayne 
 * @Date: 2018-04-01 13:01:33 
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-09 16:57:08
 */

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ScenicDetailSchema = new Schema({
  poi_id: {
    type: Number
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  tel: {
    type: String
  },
  location: {
    type: [Number],
    index: "2d"
  },
  price: {
    type: String
  },
  open_time: {
    type: String
  },
  summary: {
    type: String
  },
  suggest_time: {
    type: String
  },
  traffic: {
    type: String
  }
})



exports.ScenicDetailSchema = ScenicDetailSchema
module.exports = mongoose.model('ScenicDetail', ScenicDetailSchema)