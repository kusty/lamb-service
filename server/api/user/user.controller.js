/*
 * @Author: wayne
 * @Date: 2018-05-03 14:15:06
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-03 16:15:52
 */
const mongoose = require('mongoose');
const auth = require('../../service/auth.service');
const request = require('request');
const qs = require('qs');

const User = mongoose.model('User');
const config = require('../../config/env');

exports.getWxSession = async (ctx, next) => {
  console.log(config);
  const url = '';
  const options = {
    method: 'GET',
    url,
  };
  try {
    request(options, (error, response, body) => {
      if (error) throw new Error(error);
    });
  } catch (err) {
    throw new Error(err);
  }
};

