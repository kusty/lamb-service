
/*
 * @Author: wayne
 * @Date: 2018-05-04 13:11:06
 * @Last Modified by: wayne
 * @Last Modified time: 2018-05-05 15:12:23
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
    if (userData && userData.mobile) {
      const token = auth.signToken(userData.id);
      ctx.body = {
        status: 200,
        msg: 'ok',
        body: {
          user: userData,
          token,
        },
      };
    } else {
      Visitor.update(
        { 'wechat.unionId': wechatData.unionId },
        { wechat: wechatData },
        { upsert: true });
      ctx.body = {
        status: 200,
        msg: 'ok',
        body: {
          user: {},
        },
      };
    }
  } catch (err) {
    throw new Error(err);
  }
};

