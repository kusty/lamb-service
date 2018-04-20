/*
 * @Author: wayne
 * @Date: 2018-04-19 23:30:27
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-20 17:13:14
 */
const router = require('koa-router')();
const controller = require('./admin.controller');
const auth = require('../../service/auth.service');


router.put('/addAdmin', controller.addAdmin);
router.post('/login', controller.login);
module.exports = router;

