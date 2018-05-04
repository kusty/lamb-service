/*
 * @Author: wayne
 * @Date: 2018-05-03 19:34:35
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-04 14:13:16
 */

const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const conf = {
  env: process.env.NODE_ENV,

  mongo: {
    options: {
      useMongoClient: true,
    },
  },
  session: {
    secrets: 'lamb-secrets',
    maxAge: 720000,
  },
  // redis 配置
  redis: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },
  // wechat 配置
  wechat: {
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    grantType: 'authorization_code',
  },
  // 七牛配置
  qiniu: {
    app_key: process.env.QINIU_APP_KEY,
    app_secret: process.env.QINIU_APP_SECRET,
    domain: process.env.QINIU_APP_DOMAIN,
    bucket: process.env.QINIU_APP_BUCKET,
  },
};

let config = _.merge(conf, require(`./env/${process.env.NODE_ENV}.js`) || {});
// 加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {});
}
module.exports = config;
