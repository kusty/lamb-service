/*
 * @Author: wayne
 * @Date: 2018-04-09 13:36:17
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-23 11:12:44
 */


const mongoose = require('../../connect');
const qiniu = require('../../util/qiniu');

const ScenicList = mongoose.model('ScenicList');
const ScenicDetail = mongoose.model('ScenicDetail');
const Poi = mongoose.model('Poi');
const download = async () => {
  const list = await ScenicDetail.find({
  })
    .exec();
  return list;
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const merge = async () => {
  const list = await download();
  console.log(Poi);
  list.map(async (v) => {
    await (sleep(10));
    const obj = {
      tel: v.tel,
      traffic: v.traffic,
      open_time: v.open_time,
      suggest_time: v.suggest_time,
      price: v.price,
      address: v.address,
      summary: v.summary,
    };
    const a = await Poi.findOneAndUpdate({ poi_id: v.poi_id }, { $set: obj }, { new: true });
    console.log(a);
  });
};
merge();

