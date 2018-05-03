/*
 * @Author: wayne
 * @Date: 2018-05-03 14:13:43
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-03 14:41:03
 */
const router = require('koa-router')();
const controller = require('./user.controller');

// router.put('/addUser', controller.addAdmin);
// router.post('/login', controller.login);
router.post('/wxSession', controller.getWxSession);
module.exports = router;
