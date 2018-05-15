
/*
 * @Author: wayne
 * @Date: 2018-05-04 13:11:06
 * @Last Modified by: kusty
 * @Last Modified time: 2018-05-15 15:08:09
 */
const mongoose = require('mongoose');
const { getWxSession } = require('../../util/wechat');
const auth = require('../../service/auth.service');
const qiniu = require('../../util/qiniu');

const User = mongoose.model('User');
const Visitor = mongoose.model('Visitor');
const Login = mongoose.model('Login');

exports.loginByWx = async (ctx) => {
  const { body: { code, encryptedData, iv } } = ctx.request;
  try {
    // 获取微信数据
    const wxData = await getWxSession(code, encryptedData, iv);
    console.log(wxData);
    if (!wxData.unionId) throw new Error('找不到unionId');
    // 检查登录表是否存在登录数据
    let loginData = await Login.findOne({ 'wechat.unionId': wxData.unionId });
    let token = '';
    let user = {};
    if (loginData) {
      token = auth.signToken(loginData.id);
      user = loginData;
    } else {
      // 上传微信头像到七牛存储
      const imgData = await qiniu.fetchAndUpload(wxData.avatarUrl, '');
      const data = {
        name: wxData.nickName,
        avatar: imgData.key,
        ...wxData,
      };
      // 用户信息存到login表和访客表
      loginData = await Login.create(data);
      await Visitor.create(data);
      token = auth.signToken(loginData.id);
      user = loginData;
    }
    ctx.body = {
      status: 200,
      msg: 'ok',
      body: {
        user,
        token,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
};

