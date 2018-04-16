/*
 * @Author: wayne
 * @Date: 2018-04-09 13:36:17
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-16 12:17:13
 */


const mongoose = require('../connect');

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

update();

