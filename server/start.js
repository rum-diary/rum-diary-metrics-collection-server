/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./lib/routes.js');

const httpServer = require('./lib/http-server');

const logging = require('./lib/middleware/logging');
const errorHandler = require('./lib/middleware/error');


const app = express();

app.use(logging({ app: app }));

app.use(bodyParser.json());

app.disable('x-powered-by');

// Get all of our routes.
app.use(routes);

app.use(errorHandler);

httpServer.start({ app: app });
