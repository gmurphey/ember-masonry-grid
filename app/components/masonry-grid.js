import Ember from 'ember';

var getOptions = function (keys) {
  var properties = this.getProperties(keys);

  Object.keys(properties).forEach(function (key) {
    if (properties[key] === "null") {
      properties[key] = null;
    }

    if (properties[key] === undefined) {
      delete properties[key];
    }
  });

  return properties;
}

export default Ember.Component.extend({
  classNames: ['masonry-grid'],

  initializeMasonry: function () {
    var options = getOptions.call(this, [
          'containerStyle',
          'columnWidth',
          'gutter',
          'hiddenStyle',
          'isFitWidth',
          'isInitLayout',
          'isOriginLeft',
          'isOriginTop',
          'isResizeBound',
          'itemSelector',
          'stamp',
          'transitionDuration',
          'visibleStyle'
        ]);

    this.$().masonry(options);
  }.on('didInsertElement')
});
