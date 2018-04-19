
const router = require('koa-router')();
const controller = require('./poi.controller');


router.get('/getScenicList', controller.getScenicList);

module.exports = router;
