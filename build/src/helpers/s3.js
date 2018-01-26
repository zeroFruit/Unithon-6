'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var s3 = new _awsSdk2.default.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
});

var upload = exports.upload = function upload(buffer, _name, type) {
  return new Promise(function (resolve, reject) {
    var name = _name + '__' + (0, _moment2.default)().format('YYMMDDHHmmss') + '.jpg';
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
      ACL: 'public-read',
      Body: buffer,
      ContentType: type
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(data);
    });
  });
};