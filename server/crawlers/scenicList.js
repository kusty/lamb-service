'use strict';
const mongoose = require('../connect')
const ScenicList = mongoose.model('ScenicList')
var cheerio = require('cheerio')
var request = require('request');

var url = 'http://www.mafengwo.cn/ajax/router.php';
var page = 1;
var getList = function () {

  var options = {
    method: 'POST',
    url: 'http://www.mafengwo.cn/ajax/router.php',
    qs:
      {
        sAct: 'KMdd_StructWebAjax|GetPoisByTag',
        iMddid: '21536',
        iTagId: '0',
        iPage: page
      }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data = JSON.parse(body).data.list;
    var $ = cheerio.load(data, { decodeEntities: false });
    $('li a').each(function (idx, element) {
      var $element = $(element);
      var img = $element
        .children('div')
        .children('img')
        .attr("src")
        .split("?")[0];
      var href = $element.attr('href');
      var name = $element.text();
      var obj = {
        name: name,
        img: img,
        href: href
      }
      ScenicList.create(obj);
      console.log(obj)
    })
    var randomTime = parseInt(Math.random() * 10);
    console.log(randomTime)
    if (data != '') {
      page = page + 1;
      setTimeout(getList, randomTime * 1000)
    } else {
      console.log(JSON.parse(body).error)
    }
  });


}

getList()

