/*
 * @Author: wayne
 * @Date: 2018-04-14 13:30:34
 * @Last Modified by: kusty
 * @Last Modified time: 2018-05-15 19:33:27
 */


const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScenicsSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  profile_pic: {
    type: String,
  },
  address: {
    type: String,
  },

  country_id: {
    type: Number,
  },
  province_id: {
    type: Number,
  },
  city_id: {
    type: Number,
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


ScenicsSchema
  .virtual('list')
  .get(() => {
    return {
      _id: this._id,
      id: this.id,
      name: this.name,
      tel: this.tel,
      head_img: this.head_img,
      address: this.address,
    };
  });

exports.ScenicsSchema = ScenicsSchema;
module.exports = mongoose.model('Scenics', ScenicsSchema);
