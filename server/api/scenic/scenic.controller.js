'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')
const Scenic = mongoose.model('Scenic')

//前台获取博客列表
exports.getScenicList = async (ctx, next) => {
  let page = (parseInt(ctx.query.page) > 0) ? parseInt(ctx.query.page) : 1
  let pageSize = (parseInt(ctx.query.pageSize) > 0) ? parseInt(ctx.query.pageSize) : 10
  let startRow = (page - 1) * pageSize

  try {
    let list = [];
    await Scenic.find({
      location: {
        $near: [121.48, 31.22],  //前面是纬度 后面是精度
        $maxDistance: 100,
      }
    })
      .select('name img_list location')
      .skip(startRow)
      .limit(pageSize)
      .exec((err, data) => {
        list = data
      })

    const pagination = {
      currentPage: page,
      pageSize: pageSize,
      total: await Scenic.count()
    }
    ctx.status = 200
    ctx.body = { list, pagination }
  } catch (err) {
    ctx.throw(err)
  }
}