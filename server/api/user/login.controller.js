
/*
 * @Author: wayne
 * @Date: 2018-05-04 13:11:06
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-05 21:45:15
 */
const mongoose = require('mongoose');
const { getWxSession } = require('../../util/wechat');
const auth = require('../../service/auth.service');

const User = mongoose.model('User');
const Visitor = mongoose.model('Visitor');

exports.loginByWx = async (ctx) => {
  const { body: { code, encryptedData, iv } } = ctx.request;
  try {
    // 获取微信数据
    const wechatData = await getWxSession(code, encryptedData, iv);
    if (!wechatData.unionId) throw new Error('找不到unionId');
    const userData = await User.findOne({ 'wechat.unionId': wechatData.unionId });
    let token = '';
    let user = {};
    if (userData && userData.mobile) {
      token = auth.signToken(userData.id);
      user = userData;
    } else {
      const visitorData = await Visitor.findOneAndUpdate(
        { 'wechat.unionId': wechatData.unionId },
        { wechat: wechatData },
        { upsert: true });
      token = auth.signToken(visitorData.id);
      user = {};
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

