/* jshint node: true */
'use strict';
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-masonry-grid',
  options: {
    nodeAssets: {
      'masonry': {
        import: {
          include: [this.bowerDirectory + '/masonry/dist/masonry.pkgd.js', this.bowerDirectory + '/imagesloaded/imagesloaded.pkgd.js'],
          processTree(input) {
            return fastbootTransform(input);
          }
        }
      }
    }
  }
};
