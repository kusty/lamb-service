/*
 * @Author: wayne
 * @Date: 2018-04-09 13:36:17
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-17 13:14:31
 */


const mongoose = require('../../connect');

const ScenicList = mongoose.model('ScenicList');
const ScenicDetail = mongoose.model('ScenicDetail');
const cheerio = require('cheerio');
const request = require('request');


const fetchList = async () => {
  let dataArrary = [];
  await ScenicList.find({
  })
    .select('href')
    .exec()
    .then((data) => {
      dataArrary = data;
    })
    .catch((err) => {
      console.log(err);
    });
  return dataArrary;
};
let i = 0;
const fetchDetail = (url, arr) => {
  const options = {
    method: 'GET',
    url: `http://www.mafengwo.cn/${url}`,

  };
  // 景区列表，得到景区名，景区头图，详情连接地址
  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    const $ = cheerio.load(body, { decodeEntities: false });
    const id = url.split('/')[2].split('.')[0];
    const name = $('.container .title').text().trim();
    const summary = $('.mod-detail .summary').text().trim();
    const tel = $('.tel .content').text().trim();
    let traffic = '';
    let open_time = '';
    let price = '';
    const suggest_time = $('.item-time .content').text().trim();
    $('.mod-detail dd').each((idx, element) => {
      const $element = $(element);
      if ($element.prev('dt').text().trim() === '交通') {
        traffic = $element.text().trim();
      }
      if ($element.prev('dt').text().trim() === '门票') {
        price = $element.text().trim();
      }
      if ($element.prev('dt').text().trim() === '开放时间') {
        open_time = $element.text().trim();
      }
    });
    const address = $('.mod-location .sub').text().trim();
    const obj = {
      poi_id: id,
      name,
      summary,
      tel,
      traffic,
      open_time,
      price,
      address,
      suggest_time,
    };
    ScenicDetail.create(obj);

    const randomTime = parseInt(Math.random() * 10, 10) * 1000;
    if (url) {
      setTimeout(() => {
        i += 1;
        fetchDetail(arr[i].href, arr);
      }, randomTime);
    }
  });
};

const getDetail = async () => {
  const arr = await fetchList();
  fetchDetail(arr[i].href, arr);
};
getDetail();
