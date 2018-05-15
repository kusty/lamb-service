/*
 * @Author: kusty
 * @Date: 2018-05-11 21:59:59
 * @Last Modified by: kusty
 * @Last Modified time: 2018-05-15 14:00:40
 */

const config = require('../config');
const qiniu = require('qiniu');

const mac = new qiniu.auth.digest.Mac(config.qiniu.app_key, config.qiniu.app_secret);
const putPolicy = new qiniu.rs.PutPolicy({
  scope: config.qiniu.bucket,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
});
const uptoken = putPolicy.uploadToken(mac);

const qiniuConfig = new qiniu.conf.Config();

qiniuConfig.zone = qiniu.zone.Zone_z0;
qiniuConfig.useHttpsDomain = true;
// qiniuConfig.useCdnDomain = true

const { bucket } = config.qiniu;
const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);
exports.formUploader = formUploader;
exports.bucketManager = bucketManager;
exports.bucket = bucket;

// 上传文件
const putExtra = new qiniu.form_up.PutExtra();
exports.upload = (path, key) => {
  return new Promise(((resolve, reject) => {
    formUploader.putFile(uptoken, key, path, putExtra, (err, res, data) => {
      if (err) {
        reject(err);
      }
      if (data.statusCode === 200) {
        res.url = config.qiniu.domain + res.key;
        resolve(res);
      } else {
        reject(new Error(`error status${data.statusCode}`));
      }
    });
  }));
};

// 将网络图片上传到七牛服务器
exports.fetchAndUpload = (url, key) => {
  return new Promise(((resolve, reject) => {
    bucketManager.fetch(url, bucket, key, (err, res, data) => {
      console.log(res);
      console.log(data);
      if (err) {
        reject(err);
      }
      if (data.statusCode === 200) {
        res.url = config.qiniu.domain + res.key;
        resolve(res);
      } else {
        reject(new Error(`image upload error status${data.statusCode}`));
      }
    });
  }));
};

// 将源空间的指定资源移动到目标空间，或在同一空间内对资源重命名。
exports.move = (srcKey, destKey, { force = false }) => {
  const srcBucket = bucket;
  const destBucket = bucket;
  return new Promise(((resolve, reject) => {
    bucketManager.move(srcBucket, srcKey, destBucket, destKey, { force },
      (err, respBody, respInfo) => {
        if (err) {
          reject(err);
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody);
        } else {
          reject(new Error(`error status${respInfo.statusCode}`));
        }
      });
  }));
};

// 复制文件
exports.copy = (srcKey, destKey, { force = false }) => {
  const srcBucket = bucket;
  const destBucket = bucket;
  return new Promise(((resolve, reject) => {
    bucketManager.copy(srcBucket, srcKey, destBucket, destKey, { force },
      (err, respBody, respInfo) => {
        if (err) {
          reject(err);
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody);
        } else {
          reject(new Error(`error status${respInfo.statusCode}`));
        }
      });
  }));
};

// 删除文件
exports.remove = (key) => {
  return new Promise(((resolve, reject) => {
    bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
      if (err) {
        reject(err);
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody);
      } else {
        reject(new Error(`error status${respInfo.statusCode}`));
      }
    });
  }));
};
// 获取指定前缀文件列表
// @param options 列举操作的可选参数
//                prefix    列举的文件前缀
//                marker    上一次列举返回的位置标记，作为本次列举的起点信息
//                limit     每次返回的最大列举文件数量
//                delimiter 指定目录分隔符
exports.list = (options) => {
  const defaultOptions = {
    limit: 30,
    prefix: 'blog/index',
    marker: '',
    delimiter: '',
  };
  options = Object.assign({}, defaultOptions, options);
  return new Promise(((resolve, reject) => {
    bucketManager.listPrefix(bucket, options, (err, respBody, respInfo) => {
      if (err) {
        reject(err);
      }
      if (respInfo.statusCode == 200) {
        // 如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
        // 指定options里面的marker为这个值

        respBody.items.forEach((item) => {
          item.url = config.qiniu.domain + item.key;
        });
        resolve(respBody);
      } else {
        reject(new Error(`error status${respInfo.statusCode}`));
      }
    });
  }));
};
