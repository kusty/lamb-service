/*
 * @Author: wayne
 * @Date: 2018-04-01 13:01:33
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-13 10:22:00
 */


const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScenicListSchema = new Schema({
  name: {
    type: String,
  },
  href: {
    type: String,
  },
  img: {
    type: String,
  },

});


exports.ScenicListSchema = ScenicListSchema;
module.exports = mongoose.model('ScenicList', ScenicListSchema);
