'use strict'

const router = require('koa-router')()
const controller = require('./scenic.controller')

//获取景区列表
router.get('/getScenicList', controller.getScenicList)

module.exports = router