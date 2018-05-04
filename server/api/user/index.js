/*
 * @Author: wayne
 * @Date: 2018-05-03 14:13:43
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-04 15:54:49
 */
const router = require('koa-router')();
const userController = require('./user.controller');
const loginController = require('./login.controller');

router.post('/loginByWx', loginController.loginByWx);
module.exports = router;
