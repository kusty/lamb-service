'use strict'

const router = require('koa-router')()
const controller = require('./scenic.controller')
// const auth = require('../../auth/auth.service')
// const multer = require('koa-multer')
// const upload = multer({ dest: './uploads/' })

//获取景区列表
router.get('/getScenicList', controller.getScenicList)

module.exports = router