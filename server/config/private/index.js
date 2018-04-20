const privateConf = {
  env: process.env.NODE_ENV,
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
    app_key: process.env.QINIU_APP_KEY || 'dGEgZkGNoRLsTBsOy_7RSmLEEz4MqcpCdn-qXIXf',
    app_secret: process.env.QINIU_APP_SECRET || '32yPmhcRBnWC65QhJep8FDGQB7xW1BQFU8wfrv8i',
    domain: process.env.QINIU_APP_DOMAIN || 'qiniu.zone.Zone_z0',
    bucket: process.env.QINIU_APP_BUCKET || 'lamb-img',
  },
};

module.exports = privateConf;

