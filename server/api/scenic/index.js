
const router = require('koa-router')();
const controller = require('./scenic.controller');


router.get('/getScenicList', controller.getScenicList);

module.exports = router;
