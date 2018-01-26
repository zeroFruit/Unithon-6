'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('../src/app');

var _app2 = _interopRequireDefault(_app);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get port from environment and store in Express.
 */

var port = (0, _helper.normalizePort)(process.env.PORT || '3000'); /**
                                                                    * Module dependencies.
                                                                    */

_app2.default.set('port', port);

/**
 * Create HTTP server.
 */

var server = _http2.default.createServer(_app2.default);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', _helper.onError);
server.on('listening', function () {
  return (0, _helper.onListening)(server);
});