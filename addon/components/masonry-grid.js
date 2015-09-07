/* global imagesLoaded */
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
};

export default Ember.Component.extend({
  classNames: ['masonry-grid'],

  options: null,
  items: null,

  masonryInitialized: false,

  initializeMasonry: Ember.on('didInsertElement', function () {
    this.set('options', getOptions.call(this, [
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
    ]));

    this.layoutMasonry();
  }),

  layoutMasonry: Ember.observer('items.[]', function () {
    var _this = this;

    imagesLoaded(this.$(), function () {
      if (_this.get('masonryInitialized')) {
        _this.$().masonry('destroy');
      }

      _this.$().masonry(_this.get('options'));
      _this.set('masonryInitialized', true);
    });
  })
});
