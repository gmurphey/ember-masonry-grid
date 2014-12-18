/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-masonry-grid',

  included: function (app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/masonry/dist/masonry.pkgd.min.js');
  }
};
