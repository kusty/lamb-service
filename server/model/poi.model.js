/*
 * @Author: wayne
 * @Date: 2018-04-14 13:30:34
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-02 14:45:35
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
  country: {
    type: String,
  },
  country_id: {
    type: Number,
  },
  province: {
    type: String,
  },
  province_id: {
    type: Number,
  },
  city: {
    type: String,
  },
  city_id: {
    type: Number,
  },
  county: {
    type: String,
  },
  county_id: {
    type: Number,
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


PoiSchema
  .virtual('list')
  .get(() => {
    return {
      _id: this._id,
      poi_id: this.poi_id,
      name: this.name,
      tel: this.tel,
      head_img: this.head_img,
      address: this.address,
    };
  });

exports.PoiSchema = PoiSchema;
module.exports = mongoose.model('Poi', PoiSchema);
