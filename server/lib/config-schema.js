/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var path = require('path');
var processName = require('rum-diary-server-common').procname;

module.exports = {
  server: {
    port: {
      format: 'port',
      'default': 80,
      env: 'HTTP_PORT'
    }
  },
  env: {
    doc: 'What environment are we running in?  Note: all hosted environments are \'production\'.',
    format: ['production', 'development', 'test'],
    'default': 'production',
    env: 'NODE_ENV'
  },
  config_dir: path.join(__dirname, '..', 'etc'),
  var_dir: path.join(__dirname, '..', 'var'),
  logging: {
    file: {
      doc: 'Full path where log files should be stored',
      format: String,
      'default': path.join(__dirname, '..', 'var', 'log', processName)
    },
    level: {
      doc: 'Minimum level to log',
      format: ['TRACE', 'VERBOSE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'],
      'default': 'DEBUG'
    },
    handlers: {
      doc: 'Handlers to use',
      format: Array,
      'default': ['console', 'file']
    },
    maxSize: {
      doc: 'Maximum size of log file',
      format: Number,
      'default': 5 * 1024 * 1024
    }
  },

  mongo: {
    databaseURI: {
      doc: 'Mongo database URI',
      format: String,
      'default': 'mongodb://localhost/rum-diary-test',
      env: 'MONGO_DB_URI'
    },
    user: {
      doc: 'Mongo username',
      format: String,
      'default': undefined,
      env: 'MONGO_USER'
    },
    password: {
      doc: 'Mongo password',
      format: String,
      'default': undefined,
      env: 'MONGO_PASS'
    }
  },

  proc_name: processName
};

