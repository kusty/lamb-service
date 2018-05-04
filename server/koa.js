/*
 * @Author: wayne
 * @Date: 2018-04-20 10:24:47
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-03 19:36:39
 */


const path = require('path');
const session = require('koa-generic-session');
const RedisStore = require('koa-redis');
const responseTime = require('koa-response-time');
const logger = require('koa-logger');
const json = require('koa-json');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const passport = require('koa-passport');
const config = require('./config');

module.exports = (app) => {
  if (app.env === 'development') {
    app.use(responseTime());
    app.use(logger());
  }
  app.use(cors({
    credentials: true,
  }));
  app.use(bodyParser());
  app.use(json());
  // app.keys = [config.session.secrets];
  // app.use(session({
  //   key: 'lamb.sid',
  //   store: RedisStore({
  //     host: config.redis.host,
  //     port: config.redis.port,
  //     auth_pass: config.redis.password || '',
  //   }),
  //   cookie: config.session.cookie,
  // }));
  app.use(passport.initialize());
  app.use(compress());
};
