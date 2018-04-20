const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Admin = mongoose.model('Admin');

const config = require('../../config/env');

/**
 *
 *
 * @param {any} ctx
 * @param {any} next
 * @returns
 */
exports.addAdmin = async (ctx, next) => {
  const { body } = ctx.request;
  const account = body.account ? body.account.replace(/(^\s+)|(\s+$)/g, '') : '';
  const password = body.password ? body.password.replace(/(^\s+)|(\s+$)/g, '') : '';
  const result = await Admin.find({ account });
  let msg = '';
  let status = 100;

  if (!account || !password) {
    msg = '账号或密码不能为空';
    status = 401;
  } else if (account.length < 6) {
    msg = '账号长度不合法';
    status = 401;
  } else if (result && result.length) {
    msg = '用户名已存在';
    status = 601;
  }
  if (msg) {
    ctx.body = { msg, status };
    return ctx;
  }
  body.password = await bcrypt.hash(body.password, 5);
  try {
    const newAdmin = new Admin(ctx.request.body);
    newAdmin.userid = await createUid();
    const admin = await newAdmin.save();
    ctx.body = { msg: 'ok', status: 200, body: admin };
  } catch (err) {
    ctx.throw(err);
  }
};

/**
 *
 *生成uid
 *Todo:优化
 * @returns
 */
const createUid = async () => {
  const id = parseInt((Math.random() + 0.1) * 100000, 10);
  const result = await Admin.find({ userid: id });
  if (result && result.length) {
    createUid();
  } else {
    return id;
  }
};
