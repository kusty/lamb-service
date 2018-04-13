
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const conf = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../../..`),
  port: process.env.PORT || 9000,
  // mongodb配置
  mongo: {
    options: {
      useMongoClient: true,
      // user: process.env.MONGO_USERNAME || '',
      // pass: process.env.MONGO_PASSWORD || ''
    },
  },
  // redis 配置
  redis: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },

  // 七牛配置
  qiniu: {
    app_key: process.env.QINIU_APP_KEY || '',
    app_secret: process.env.QINIU_APP_SECRET || '',
    domain: process.env.QINIU_APP_DOMAIN || '',
    bucket: process.env.QINIU_APP_BUCKET || '',
  },
};

let config = _.merge(conf, require(`./${process.env.NODE_ENV}.js`) || {});
// 加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {});
}
module.exports = config;
