/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var path = require('path');
var common = require('rum-diary-server-common');

var config = require('./lib/config');
var logger = common.logging(common.configAdapter(config, 'logging'));

var db = common.db(common.configAdapter(config, 'mongo'));

var MetricsCollector = require('./lib/metrics-collector');
var metricsCollector = new MetricsCollector({
  db: db,
  logger: logger
});



var app = common.app();
app.disable('x-powered-by');

app.use(common.middleware.logging(logger));
app.use(require('body-parser').json());
app.use(common.router({
  cwd: path.join(__dirname, 'routes'),
  route_config: {
    'POST-metrics': {
      collectors: [ metricsCollector ]
    }
  }
}));
app.use(require('./lib/middleware/error')(logger));

common.httpServer.start(app, logger, common.configAdapter(config, 'server'));
