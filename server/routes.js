const Router = require('koa-router')();
// const logs = require('./api/logs')
const admin = require('./api/admin');
const user = require('./api/user');
const scenics = require('./api/scenics');

module.exports = (app) => {
  Router.use('/admin', admin.routes(), admin.allowedMethods());
  Router.use('/scenics', scenics.routes(), scenics.allowedMethods());
  Router.use('/user', user.routes(), user.allowedMethods());
  Router.get('/*', (ctx) => {
    ctx.body = { status: '404', data: 'not found' };
  });
  app.use(Router.routes());
};
