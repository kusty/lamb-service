/*
 * @Author: wayne 
 * @Date: 2018-04-09 13:36:17 
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-09 17:41:14
 */
'use strict';

const mongoose = require('../connect')
const ScenicList = mongoose.model('ScenicList')
const ScenicDetail = mongoose.model('ScenicDetail')
const cheerio = require('cheerio')
const request = require('request');

const url = 'http://www.mafengwo.cn/';
const fetchList = async () => {
  let dataArrary = []
  await ScenicList.find({
  })
    .select('href')
    .exec()
    .then((data) => {
      dataArrary = data
    })
    .catch((err) => {
      console.log(err)

    })
  return dataArrary
}
var i = 0;
const fetchDetail = (url, arr) => {
  const options = {
    method: 'GET',
    url: 'http://www.mafengwo.cn/' + url,

  };
  //景区列表，得到景区名，景区头图，详情连接地址
  request(options, function (error, response, body) {

    if (error) throw new Error(error);

    const $ = cheerio.load(body, { decodeEntities: false });
    let id = url.split('/')[2].split('.')[0];
    let name = $('.container .title').text().trim();
    let summary = $('.mod-detail .summary').text().trim();
    let tel = $('.tel .content').text().trim();
    let traffic = '';
    let open_time = '';
    let price = '';
    let suggest_time = $('.item-time .content').text().trim();
    $('.mod-detail dd').each(function (idx, element) {
      const $element = $(element);
      if ($element.prev('dt').text().trim() === '交通') {
        traffic = $element.text().trim()
      }
      if ($element.prev('dt').text().trim() === '门票') {
        price = $element.text().trim()
      }
      if ($element.prev('dt').text().trim() === '开放时间') {
        open_time = $element.text().trim()
      }
    })
    let address = $('.mod-location .sub').text().trim();
    const obj = {
      poi_id: id,
      name: name,
      summary: summary,
      tel: tel,
      traffic: traffic,
      open_time: open_time,
      price: price,
      address: address,
      suggest_time: suggest_time
    }
    console.log(obj);
    ScenicDetail.create(obj);

    const randomTime = parseInt(Math.random() * 10);
    console.log(randomTime)
    if (url) {
      setTimeout(function () {
        i = i + 1;
        fetchDetail(arr[i].href, arr)
      }, randomTime * 1000)
    }
  });
}

var getDetail = async function () {
  var arr = await fetchList()
  fetchDetail(arr[i].href, arr)
}
getDetail();
