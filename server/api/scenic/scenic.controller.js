'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')
const Scenic = mongoose.model('Scenic')

//前台获取博客列表
exports.getScenicList = async (ctx, next) => {
  let page = (parseInt(ctx.query.page) > 0) ? parseInt(ctx.query.page) : 1
  let pageSize = (parseInt(ctx.query.pageSize) > 0) ? parseInt(ctx.query.pageSize) : 10
  let startRow = (page - 1) * pageSize
  // let sort = String(ctx.query.sortName) || 'publish_time'
  // sort = '-' + sort
  // let condition = { status: { $gt: 0 } }
  // if (ctx.query.tagId) {
  //   //tagId = new mongoose.Types.ObjectId(tagId)
  //   const tagId = String(ctx.query.tagId)
  //   condition = _.defaults(condition, { tags: { $elemMatch: { $eq: tagId } } })
  // }
  try {
    const list = await Scenic.find({
      location: {
        $near: [121.48, 31.22],  //前面是纬度 后面是精度
        $maxDistance: 10    //10公里之内的数据
      }
    })
      .select('name img_list')
      .skip(startRow)
      .limit(pageSize)
      // .sort(sort)
      .exec()
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