/*
 * @Author: wayne
 * @Date: 2018-05-04 13:11:06
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-04 15:08:23
 */
const mongoose = require('mongoose');
const auth = require('../../service/auth.service');
const request = require('request');
const qs = require('qs');

const User = mongoose.model('User');
const config = require('../../config');
const WXBizDataCrypt = require('../../util/WXBizDataCrypt');

exports.loginByWx = async (ctx, next) => {
  const { body: { code, encryptedData, iv } } = ctx.request;
  const { appid, secret, grantType } = config.wechat;
  let { url } = config.wechat;
  url = `${url}?${qs.stringify({
    appid,
    secret,
    js_code: code,
    grant_type: grantType,
  })}`;
  const options = {
    method: 'GET',
    url,
  };
  try {
    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      const pc = new WXBizDataCrypt(appid, result.session_key);
      const data = pc.decryptData(encryptedData, iv);
    });
  } catch (err) {
    throw new Error(err);
  }
};

