'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postBook = exports.getBucketInfo = exports.getHome = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _s = require('../helpers/s3');

var s3 = _interopRequireWildcard(_s);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

function getHome(req, res) {
  return res.send('\n      <h1>Page App Asset Server</h1>\n      <h2>beta-0.0.1</h2>\n      <br>\n    ');
}

function getBucketInfo(req, res) {
  return res.json({
    bucket: process.env.AWS_BUCKET_NAME
  });
}

function postBook(req, res) {
  var _req$file = req.file,
      buffer = _req$file.buffer,
      originalname = _req$file.originalname,
      mimetype = _req$file.mimetype;

  var key = originalname.split('.')[0];
  s3.upload(buffer, key, mimetype).then(function (result) {
    console.log((0, _moment2.default)().format('YY-MM-DD HH:mm:ss') + ' Successfully upload.');
    return res.json(result);
  });
}

exports.getHome = getHome;
exports.getBucketInfo = getBucketInfo;
exports.postBook = postBook;