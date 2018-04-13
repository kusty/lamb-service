

const mongoose = require('../connect');

const Scenic = mongoose.model('Scenic');
const showapiSdk = require('showapi-sdk');
// 设置你测试用的appId和secret,img
const appId = '60615';
const secret = '06f75402315c48d0b210ce99079f1f1c';
// 开启debug
// showapiSdk.debug(true);
if (!(appId && secret)) {
  console.error('请先设置appId等测试参数,详见样例代码内注释!');
  return;
}
// 全局默认设置
showapiSdk.setting({
  url: 'http://route.showapi.com/268-1', // 你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
  appId, // 你的应用id
  secret, // 你的密钥
  timeout: 5000, // http超时设置
  options: {// 默认请求参数,极少用到
    testParam: 'test',
  },
});

const request = showapiSdk.request();
request.appendText('keyword', '');
request.appendText('proId', '');
request.appendText('cityId', '');
request.appendText('areaId', '');
let i = 1;
var res = function () {
  request.appendText('page', i.toString());
  request.post((data) => {
    console.log(data);
    const d = data.showapi_res_body.pagebean.contentlist;
    const o = [];
    if (d.length <= 0) {
      return;
    }
    d.map((v) => {
      const img = [];
      v.picList.map(vs => img.push(vs.picUrl));
      const obj = {
        pro_id: v.proId,
        pro_name: v.proName,
        summary: v.summary,
        location: [v.location.lon, v.location.lat],
        city_id: v.cityId,
        city_name: v.cityName,
        area_id: v.areaId,
        area_name: v.areaName,
        content: v.content,
        address: v.address,
        price_list: v.priceList,
        price: v.price,
        name: v.name,
        coupon: v.coupon,
        img_list: img,
        attention: v.attention,
      };
      Scenic.create(obj);
    });
    if (i < 1500) {
      i += 1;
      setTimeout(res, 400);
    }
  });
};
res();
