

const mongoose = require('../connect');

const ScenicList = mongoose.model('ScenicList');
const cheerio = require('cheerio');
const request = require('request');

const url = 'http://www.mafengwo.cn/ajax/router.php';
let page = 1065;
var getList = function () {
  const options = {
    method: 'POST',
    url: 'http://www.mafengwo.cn/ajax/router.php',
    qs:
      {
        sAct: 'KMdd_StructWebAjax|GetPoisByTag',
        iMddid: '21536',
        iTagId: '0',
        iPage: page,
      },
  };

  request(options, (error, response, body) => {
    console.log(page);
    if (error) throw new Error(error);
    const data = JSON.parse(body).data.list;
    const $ = cheerio.load(data, { decodeEntities: false });
    $('li a').each((idx, element) => {
      let $element = $(element);
      let img = $element
        .children('div')
        .children('img')
        .attr('src')
        .split('?')[0];
      let href = $element.attr('href');
      let name = $element.text();
      let obj = {
        name,
        img,
        href,
      };
      ScenicList.create(obj);
      console.log(obj);
    });
    const randomTime = parseInt(Math.random() * 10);
    console.log(randomTime);
    if (data != '') {
      page += 1;
      setTimeout(getList, randomTime * 1000);
    } else {
      console.log(JSON.parse(body).error);
    }
  });
};

getList();

