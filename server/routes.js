const Router = require('koa-router')()
// const logs = require('./api/logs')
const scenic = require('./api/scenic')


module.exports = function (app) {
  Router.use('/scenic', scenic.routes(), scenic.allowedMethods())
  Router.get('/*', (ctx, next) => {
    ctx.body = { status: '404', data: '牛逼了.' }
  })
  app.use(Router.routes())
}