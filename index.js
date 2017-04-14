/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-masonry-grid',

  included: function (app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import({
        development: app.bowerDirectory + '/masonry/dist/masonry.pkgd.js',
        production: app.bowerDirectory + '/masonry/dist/masonry.pkgd.min.js'
      });

      app.import({
        development: app.bowerDirectory + '/imagesloaded/imagesloaded.pkgd.js',
        production: app.bowerDirectory + '/imagesloaded/imagesloaded.pkgd.min.js'
      });
    }
  }
};
