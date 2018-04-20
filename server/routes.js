const Router = require('koa-router')();
// const logs = require('./api/logs')
const admin = require('./api/admin');


module.exports = (app) => {
  Router.use('/admin', admin.routes(), admin.allowedMethods());
  Router.get('/*', (ctx, next) => {
    ctx.body = { status: '404', data: '牛逼了.' };
  });
  app.use(Router.routes());
};

