/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-masonry-grid',

  included: function (app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/jquery-masonry/dist/masonry.pkgd.min.js');
    app.import(app.bowerDirectory + '/imagesloaded/imagesloaded.pkgd.min.js');
  }
};
