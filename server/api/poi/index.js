
const router = require('koa-router')();
const controller = require('./poi.controller');
const auth = require('../../service/auth.service');

router.get('/getList', controller.getList);

module.exports = router;
