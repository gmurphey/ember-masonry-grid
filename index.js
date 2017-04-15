/* eslint-env node */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-masonry-grid',

  included(app) {

    this.addonConfig = this.app.project.config(app.env)['ember-masonry-grid'] || {};

    const vendor = this.treePaths.vendor;

    if (!isFastBoot()) {
      // Masonry
      app.import({
        development: vendor + '/masonry/masonry.pkgd.js',
        production: vendor + '/masonry/masonry.pkgd.min.js'
      });

      // Imagesloaded
      if (this.addonConfig.imagesLoaded !== false) {
        app.import({
          development: vendor + '/imagesloaded/imagesloaded.pkgd.js',
          production: vendor + '/imagesloaded/imagesloaded.pkgd.min.js'
        });
      }

    }

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(moduleToFunnel('masonry-layout', {
      srcDir: 'dist',
      include: ['*.pkgd.js'],
      destDir: 'masonry'
    }));

    trees.push(moduleToFunnel('imagesloaded', {
      include: ['*.pkgd.js'],
      destDir: 'imagesloaded'
    }));

    return mergeTrees(trees);
  },

};

function moduleToFunnel(moduleName, opts) {
  opts = opts || { destDir: moduleName };
  return new Funnel(resolveModulePath(moduleName), opts);
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
