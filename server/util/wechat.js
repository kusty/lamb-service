/*
 * @Author: wayne
 * @Date: 2018-05-04 14:15:48
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-05 14:38:41
 */
const crypto = require('crypto');
const config = require('../config');
const request = require('request');
const qs = require('qs');

const decryptData = (sessionKey, encryptedData, iv) => {
  // base64 decode
  const sessionKeyBuffer = Buffer.from(sessionKey, 'base64');
  const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
  const ivBuffer = Buffer.from(iv, 'base64');
  const { appId } = config.wechat;
  let decoded = {};
  try {
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBuffer, ivBuffer);
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    decoded = decipher.update(encryptedDataBuffer, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    decoded = JSON.parse(decoded);
  } catch (err) {
    throw new Error('Illegal Buffer');
  }
  if (decoded.watermark.appid !== appId) {
    throw new Error('Illegal Buffer');
  }
  return decoded;
};

exports.getWxSession = async (code, encryptedData, iv) => {
  const { appId, secret, grantType } = config.wechat;
  let data = {};
  let { url } = config.wechat;
  url = `${url}?${qs.stringify({
    appid: appId,
    secret,
    js_code: code,
    grant_type: grantType,
  })}`;
  const options = {
    method: 'GET',
    url,
  };
  // 构造promise 以使用await
  await new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      const res = JSON.parse(body);
      if (!error && response.statusCode === 200) {
        data = decryptData(res.session_key, encryptedData, iv);
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
  return data;
};
