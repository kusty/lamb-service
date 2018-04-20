/*
 * @Author: wayne
 * @Date: 2018-04-19 23:30:27
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-19 23:43:15
 */
const router = require('koa-router')();
const controller = require('./admin.controller');
const auth = require('../../service/auth.service');


router.post('/addAdmin', controller.addAdmin);

module.exports = router;

