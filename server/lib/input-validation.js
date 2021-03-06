/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// A simple wrapper around joi with some helper functions.

const joi = require('joi');

'use strict';

for (var key in joi) {
  if (typeof joi[key] === 'function') {
    exports[key] = joi[key].bind(joi);
  }
}

// A referrer for navigation data.
// TODO - fill this out. It should be a full URL.
exports.referrer = function () {
  return joi.string().allow('');
};

// A location for navigation data.
// TODO - fill this out. It should be a full URL.
exports.location = function () {
  return joi.string().allow('').optional();
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
    validationConfig[field] = joi.alternatives(joi.number().integer(), joi.any().allow(null));
  });
  return joi.object(validationConfig);
};

// guids used in reporting session information.
exports.guid = function () {
  return joi.string().guid();
};

// previous uuid - this is optional and is not reported if the user
// is visiting their first page on the site in this session.
exports.puuid = function () {
  return joi.alternatives(exports.guid(), joi.any().allow(null));
};

// Tags when reporting navigation timing.
exports.tags = function () {
  return joi.array().includes(joi.string().allow(''));
};

// Session duration.
exports.duration = function () {
  return joi.alternatives(joi.number().integer(), joi.any().allow(null));
};

// unload data timers.
exports.timers = function () {
  return joi.object();
};

// unload data events.
exports.events = function () {
  return joi.array(joi.any());
};

// The user-agent
exports.userAgent = function () {
  return joi.string().min(0).max(200).optional();
};
