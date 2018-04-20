

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

  // 七牛配置
  qiniu: {
    app_key: process.env.QINIU_APP_KEY || 'dGEgZkGNoRLsTBsOy_7RSmLEEz4MqcpCdn-qXIXf',
    app_secret: process.env.QINIU_APP_SECRET || '32yPmhcRBnWC65QhJep8FDGQB7xW1BQFU8wfrv8i',
    domain: process.env.QINIU_APP_DOMAIN || 'qiniu.zone.Zone_z0',
    bucket: process.env.QINIU_APP_BUCKET || 'lamb-img',
  },
};

module.exports = conf;
