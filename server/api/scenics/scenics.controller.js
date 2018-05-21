
/*
 * @Author: wayne
 * @Date: 2018-04-20 09:31:38
 * @Last Modified by: kusty
 * @Last Modified time: 2018-05-17 18:03:19
 */
const mongoose = require('mongoose');

const Scenics = mongoose.model('Scenics');

exports.getList = async (ctx) => {
  const { query } = ctx;
  const currentPage = parseInt(query.currentPage, 10) > 0 ? parseInt(query.currentPage, 10) : 1;
  const pageSize = parseInt(query.pageSize, 10) > 0 ? parseInt(query.pageSize, 10) : 10;
  const skipRow = (currentPage - 1) * pageSize;
  try {
    const result = await Scenics.find({})
      .skip(skipRow)
      .limit(pageSize)
      .exec();
    const total = await Scenics.find({}).count();
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

