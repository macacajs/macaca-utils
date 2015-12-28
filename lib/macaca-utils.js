/* ================================================================
 * macaca-utils by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Dec 28 2015 14:44:44 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const path = require('path');
const moment = require('moment');
const mkdirp = require('mkdirp');

_.camelcase = (str) => {
  return str.split('-').reduce((str, word) => {
    return str + word[0].toUpperCase() + word.slice(1);
  });
};

_.getConfig = (program) => {
  let cfg = {};

  program.options.forEach((item) => {
    const key = _.camelcase(item.name());

    if (key in program) {

      if (typeof program[key] !== 'function') {
        cfg[key] = program[key];
      }
    }
  });
  return cfg;
};

_.mkdir = mkdirp.sync;
_.parse = parse;
_.validator = validator;
_.moment = moment;
_.uuid = uuid.v4;

_.platform = (function() {
  var platform = os.platform();

  return {
    isWindows: platform.indexOf('win') === 0 || platform === 'cygwin',
    isLinux: platform === 'linux' || platform === 'freebsd',
    isOSX: platform === 'darwin'
  };
})();

_.isExistedFile = function(p){
  p = p.replace(/(\?|#).*$/, '');
  return fs.existsSync(p) && fs.statSync(p).isFile();
};

_.isExistedDir = function(p){
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
};

module.exports = _;
