'use strict';

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _controllers = require('../controllers');

var ctrl = _interopRequireWildcard(_controllers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)();

module.exports = function (app) {
  app.get('/', ctrl.getHome);
  app.get('/info', ctrl.getBucketInfo);
  app.post('/', upload.single('photo'), ctrl.postBook);
};