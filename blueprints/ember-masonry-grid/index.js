module.exports = {
  name: 'ember-masonry-grid',
  description: 'Add ember-masonry-grid bower dependencies to app.',

  normalizeEntityName: function () {
  },

  afterInstall: function () {
    return this.addBowerPackageToProject('masonry');
  }
};
