'use strict';

var util = require('xutil');

var _ = Object.assign({}, util);

_.sudoUserPermissionDenied = function() {
  if (process.env.SUDO_USER) {
    console.log('  DONT USE `sudo` to install\n');

    var localDir = '/usr/local';

    if (_.isExistedDir(localDir)) {
      console.log('    if `${localDir}` is not writable');
      console.log(`    sudo chown -R $(whoami) ${localDir}`);
    }
    process.exit(0);
  }
};

module.exports = _;
