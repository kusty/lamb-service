/*
 * @Author: wayne
 * @Date: 2018-04-09 13:36:17
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-17 13:16:17
 */


const mongoose = require('../../connect');
const qiniu = require('../../util/qiniu');

const ScenicList = mongoose.model('ScenicList');

const update = async () => {
  const dataArrary = [];

  await ScenicList.find({
  })
    .exec()
    .then((data) => {
      data.map(async (v) => {
        const image = v.img || '';
        const imgArr = image.split('/') || [];
        const headImg = imgArr[imgArr.length - 1];
        await ScenicList.findByIdAndUpdate(v.id, { $set: { head_img: headImg } }, { new: true });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return dataArrary;
};
let arr = [];
const download = async () => {
  await ScenicList.find({
  })
    .exec()
    .then((data) => {
      arr = data.splice(25136, data.length);
    })
    .catch((err) => {
      console.log(err);
    });
};
const up = async () => {
  await download();

  arr.map((v, k) => {
    return setTimeout(() => {
      qiniu.fetch(v.img, v.head_img);
    }, k * 100);
  });
};
up();

