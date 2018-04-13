
const mongoose = require('mongoose');

const Scenic = mongoose.model('Scenic');


exports.getScenicList = async (ctx, next) => {
  const page = (parseInt(ctx.query.page) > 0) ? parseInt(ctx.query.page) : 1;
  const pageSize = (parseInt(ctx.query.pageSize) > 0) ? parseInt(ctx.query.pageSize) : 10;
  const startRow = (page - 1) * pageSize;

  try {
    let list = [];
    await Scenic.find({
      location: {
        $near: [121.48, 31.22], // 前面是纬度 后面是精度
        $maxDistance: 100,
      },
    })
      .select('name img_list location')
      .skip(startRow)
      .limit(pageSize)
      .exec((err, data) => {
        list = data;
      });

    const pagination = {
      currentPage: page,
      pageSize,
      total: await Scenic.count(),
    };
    ctx.status = 200;
    ctx.body = { list, pagination };
  } catch (err) {
    ctx.throw(err);
  }
};

