/*
 * @Author: wayne
 * @Date: 2018-04-18 15:40:49
 * @Last Modified by: wayne
 * @Last Modified time: 2018-04-20 17:54:32
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const auth = require('../../service/auth.service');

const Admin = mongoose.model('Admin');
const config = require('../../config/env');

/**
 *
 *增加管理员账户
 * @param {any} ctx
 * @param {any} next
 * @returns
 */
exports.addAdmin = async (ctx, next) => {
  const { body } = ctx.request;
  const account = body.account ? body.account.replace(/(^\s+)|(\s+$)/g, '') : '';
  const password = body.password ? body.password.replace(/(^\s+)|(\s+$)/g, '') : '';

  if (!account || !password) {
    ctx.body = {
      msg: '账号或密码不能为空',
      status: 401,
    };
    return;
  } else if (account.length < 6) {
    ctx.body = {
      msg: '账号长度不合法',
      status: 401,
    };
    return;
  }
  try {
    const result = await Admin.find({ account });
    if (result && result.length) {
      ctx.body = {
        msg: '用户名已存在',
        status: 601,
      };
      return;
    } else {
      body.password = await bcrypt.hash(body.password, 5);// 加密密码存储
      body.userid = await createUid();// 生成一个随机的userid
      const newAdmin = new Admin(ctx.request.body);
      const admin = await newAdmin.save();
      ctx.body = {
        msg: 'ok',
        status: 200,
        body: admin,
      };
      return;
    }
  } catch (err) {
    ctx.throw(err);
  }
};

exports.login = async (ctx, next) => {
  const { body } = ctx.request;
  const account = body.account ? body.account.replace(/(^\s+)|(\s+$)/g, '') : '';
  const password = body.password ? body.password.replace(/(^\s+)|(\s+$)/g, '') : '';

  try {
    const result = await Admin.findOne({ account });
    if (!result) {
      ctx.body = {
        msg: '账号尚未注册',
        status: 602,
      };
      return;
    } else if (await bcrypt.compare(password, result.password)) {
      const token = auth.signToken(result._id);
      ctx.body = {
        msg: 'ok',
        status: 200,
        body: {
          user: result,
          token,
        },
      };
      return;
    } else {
      ctx.body = {
        msg: '密码错误',
        status: 603,
      };
      return;
    }
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
