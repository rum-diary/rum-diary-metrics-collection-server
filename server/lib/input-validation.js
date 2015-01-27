/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// A simple wrapper around joi with some helper functions.

'use strict';

var iv = require('rum-diary-server-common').inputValidation;

for (var key in iv) {
  if (typeof iv[key] === 'function') {
    exports[key] = iv[key].bind(iv);
  }
}

// A referrer for navigation data.
// TODO - fill this out. It should be a full URL.
exports.referrer = function () {
  return iv.string().allow('');
};

// A location for navigation data.
// TODO - fill this out. It should be a full URL.
exports.location = function () {
  return iv.string().allow('').optional();
};

// navigationTiming data.
exports.navigationTiming = function () {
  // some fields are optional or are not sent depending on the circumstance.
  // unload events are not sent if the previous page is on a different domain.
  // redirect events are not sent if there is no redirect.
  // secureConnectionStart is not sent if using only an HTTP connection.
  var fields = require('./navigation-timing');
  var validationConfig = {};
  fields.forEach(function (field) {
    validationConfig[field] = iv.alternatives(iv.number().integer(), iv.any().allow(null));
  });
  return iv.object(validationConfig);
};

// guids used in reporting session information.
exports.guid = function () {
  return iv.string().guid();
};

// previous uuid - this is optional and is not reported if the user
// is visiting their first page on the site in this session.
exports.puuid = function () {
  return iv.alternatives(exports.guid(), iv.any().allow(null));
};

// Tags when reporting navigation timing.
exports.tags = function () {
  return iv.array().includes(iv.string().allow(''));
};

// Session duration.
exports.duration = function () {
  return iv.alternatives(iv.number().integer(), iv.any().allow(null));
};

// unload data timers.
exports.timers = function () {
  return iv.object();
};

// unload data events.
exports.events = function () {
  return iv.array(iv.any());
};

// The user-agent
exports.userAgent = function () {
  return iv.string().min(0).max(200).optional();
};
