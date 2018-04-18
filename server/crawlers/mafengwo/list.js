

const mongoose = require('../../connect');

const ScenicList = mongoose.model('ScenicList');
const cheerio = require('cheerio');
const request = require('request');

const url = 'http://www.mafengwo.cn/ajax/router.php';
let page = 0;
const getList = () => {
  const options = {
    method: 'POST',
    url,
    qs:
      {
        sAct: 'KMdd_StructWebAjax|GetPoisByTag',
        iMddid: '21536',
        iTagId: '0',
        iPage: page,
      },
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    const data = JSON.parse(body).data.list;
    const $ = cheerio.load(data, { decodeEntities: false });
    $('li a').each((idx, element) => {
      const $element = $(element);
      const img = $element
        .children('div')
        .children('img')
        .attr('src')
        .split('?')[0];
      const href = $element.attr('href');
      const name = $element.text();
      const obj = {
        name,
        img,
        href,
      };
      ScenicList.create(obj);
    });
    const randomTime = parseInt(Math.random() * 10, 10);

    if (data) {
      page += 1;
      setTimeout(getList, randomTime * 1000);
    }
  });
};

getList();

