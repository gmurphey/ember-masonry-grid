/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const path = require('path');

module.exports = {
  name: 'ember-masonry-grid',

  included(app) {

    this.addonConfig = this.app.project.config(app.env)['ember-masonry-grid'] || {};

    let { treePaths: { vendor } } = this;

    // Masonry
    app.import({
      development: `${vendor}/masonry/masonry.pkgd.js`,
      production: `${vendor}/masonry/masonry.pkgd.min.js`
    });

    // Imagesloaded
    if (this.addonConfig.imagesLoaded !== false) {
      app.import({
        development: `${vendor}/imagesloaded/imagesloaded.pkgd.js`,
        production: `${vendor}/imagesloaded/imagesloaded.pkgd.min.js`
      });
    }

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      fastbootTransform(
        moduleToFunnel('masonry-layout', {
          srcDir: 'dist',
          include: ['*.pkgd.js', '*.pkgd.min.js'],
          destDir: 'masonry'
        })
      )
    );

    trees.push(
      fastbootTransform(
        moduleToFunnel('imagesloaded', {
          include: ['*.pkgd.js', '*.pkgd.min.js'],
          destDir: 'imagesloaded'
        })
      )
    );

    return mergeTrees(trees);
  }

};

function moduleToFunnel(moduleName, opts) {
  opts = opts || { destDir: moduleName };
  return new Funnel(resolveModulePath(moduleName), opts);
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}
