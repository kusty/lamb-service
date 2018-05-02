
/*
 * @Author: wayne
 * @Date: 2018-04-20 09:31:38
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-26 09:46:27
 */
const mongoose = require('mongoose');

const Poi = mongoose.model('Poi');

exports.getList = async (ctx, next) => {
  const { query } = ctx;
  const currentPage = parseInt(query.currentPage, 10) > 0 ? parseInt(query.currentPage, 10) : 1;
  const pageSize = parseInt(query.pageSize, 10) > 0 ? parseInt(query.pageSize, 10) : 10;
  const skipRow = (currentPage - 1) * pageSize;
  try {
    const result = await Poi.find({})
      .skip(skipRow)
      .limit(pageSize)
      .exec();
    const total = await Poi.find({}).count();
    console.log(result);
    ctx.body = {
      status: 200,
      msg: 'ok',
      body: {
        list: result,
        pagination: {
          currentPage,
          pageSize,
          total,
        },
      },
    };
  } catch (err) {
    ctx.throw(err);
  }
};

