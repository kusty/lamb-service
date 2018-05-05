const Router = require('koa-router')();
// const logs = require('./api/logs')
const admin = require('./api/admin');
const user = require('./api/user');
const poi = require('./api/poi');

module.exports = (app) => {
  Router.use('/admin', admin.routes(), admin.allowedMethods());
  Router.use('/poi', poi.routes(), poi.allowedMethods());
  Router.use('/user', user.routes(), user.allowedMethods());
  Router.get('/*', (ctx, next) => {
    ctx.body = { status: '404', data: 'not found' };
  });
  app.use(Router.routes());
};
