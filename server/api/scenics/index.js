
const router = require('koa-router')();
const controller = require('./scenics.controller');
const auth = require('../../service/auth.service');

router.get('/list', controller.getList);

module.exports = router;
