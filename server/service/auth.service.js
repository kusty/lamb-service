

const mongoose = require('../connect');
const config = require('../config/env');
const koajwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const compose = require('koa-compose');

const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
/**
 * 验证token
 */
function authToken() {
  return compose([
    async (ctx, next) => {
      if (ctx.query && ctx.query.access_token) {
        ctx.headers.authorization = `Bearer ${ctx.query.access_token}`;
      }
      await next();
    },
    koajwt({ secret: config.session.secrets, passthrough: true }),
  ]);
}
/**
 * 验证用户是否登录
 */
exports.isAuthenticated = (role = 'user') => {
  return compose([
    authToken(),
    async (ctx, next) => {
      if (!ctx.state.user) {
        ctx.body = {
          status: 410,
          msg: '无效的token',
        };
        return;
      }
      await next();
    },
    async (ctx, next) => {
      let user = '';
      try {
        if (role === 'user') {
          user = await User.findById(ctx.state.user._id);
        }
        if (role === 'admin') {
          user = await Admin.findById(ctx.state.user._id);
        }
        if (!user) {
          ctx.body = {
            status: 412,
            msg: '找不到用户信息',
          };
        }
        return;
      } catch (err) {
        ctx.throw('UnauthorizedError', 401);
      }
      ctx.req.user = user;
      await next();
    },
  ]);
};


/**
 * 生成token
 */
exports.signToken = (id) => {
  return jwt.sign({ _id: id }, config.session.secrets, { expiresIn: config.session.maxAge });
};
