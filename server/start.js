/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./lib/routes.js');

var httpServer = require('./lib/http-server');

var logging = require('./lib/middleware/logging');
var errorHandler = require('./lib/middleware/error');

var app = express();

app.use(logging({ app: app }));

app.use(bodyParser.json());

app.disable('x-powered-by');

app.use(routes);

app.use(errorHandler);

httpServer.start({ app: app });
