/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var RumDiaryEndpoint = require('rum-diary-endpoint');
var MetricsHandler = RumDiaryEndpoint.Handler;
var inputValidation = require('../lib/input-validation');

module.exports = function (options) {
  options = options || {};

  var collectors = options.collectors;

  var itemSchema = {
    uuid: inputValidation.guid(),
    puuid: inputValidation.puuid(),
    referrer: inputValidation.referrer().optional(),
    tags: inputValidation.tags().optional(),
    returning: inputValidation.boolean(),
    navigationTiming: inputValidation.navigationTiming(),
    duration: inputValidation.duration(),
    timers: inputValidation.timers(),
    events: inputValidation.events(),
    userAgent: inputValidation.userAgent(),
    location: inputValidation.location(),
    screen: inputValidation.object().keys({
      width: inputValidation.number(),
      height: inputValidation.number()
    }).optional()
  };

  return {
    path: '/metrics',
    method: 'post',
    cors: true,
    authorization: function () {
      // anything goes.
    },

    validation: inputValidation.alternatives().try(
      inputValidation.array().includes(itemSchema), itemSchema),

    handler: new MetricsHandler({
      collectors: collectors
    })
  };
};


