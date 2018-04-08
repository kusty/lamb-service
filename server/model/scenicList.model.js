/*
 * @Author: wayne 
 * @Date: 2018-04-01 13:01:33 
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-08 22:17:44
 */

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ScenicListSchema = new Schema({
  name: {
    type: String
  },
  href: {
    type: String
  },
  img: {
    type: String
  },

})



exports.ScenicListSchema = ScenicListSchema
module.exports = mongoose.model('ScenicList', ScenicListSchema)