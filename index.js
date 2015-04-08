/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-masonry-grid',

  included: function (app) {
    this._super.included(app);

    app.import({
      development: app.bowerDirectory + '/jquery-masonry/dist/masonry.pkgd.js',
      production: app.bowerDirectory + '/jquery-masonry/dist/masonry.pkgd.min.js'
    });

    app.import({
      development: app.bowerDirectory + '/imagesloaded/imagesloaded.pkgd.js',
      production: app.bowerDirectory + '/imagesloaded/imagesloaded.pkgd.min.js'
    });
  }
};
