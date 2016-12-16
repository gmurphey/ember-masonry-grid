var RSVP = require('rsvp');
module.exports = {
  name: 'ember-masonry-grid',
  description: 'Add ember-masonry-grid bower dependencies to app.',

  normalizeEntityName: function () {
  },

  afterInstall: function () {
    return RSVP.all([
        this.addBowerPackageToProject('masonry'),
        this.addPackagesToProject([
            { name: 'imagesloaded' },
            { name: 'ember-browserify' },
            { name: 'rsvp' }
        ])
    ]);
  }
};
