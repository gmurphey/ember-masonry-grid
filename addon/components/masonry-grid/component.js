/* global imagesLoaded, Masonry */
import Ember from 'ember';
import layout from './template';

const {
  Component,
  computed,
  defineProperty,
  getProperties,
  get,
  set
} = Ember;

const {
  htmlSafe
} = Ember.String;

const MASONRY_OPTION_KEYS = Ember.A([
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

export default Component.extend({
  layout,
  classNames: ['masonry-grid'],

  // masonry default options
  // overriding the default `isInitLayout` value allows us to attach an event for
  // `layoutComplete` before the first render
  isInitLayout: false,
  itemSelector: '.masonry-item',
  attributeBindings: ['masonryGridStyle:style'],

  masonryGridStyle: htmlSafe('position: relative'),

  customLayout: false,
  masonry: null,

  itemClass: computed('itemSelector', function() {
    return get(this, 'itemSelector').replace('.', '');
  }),

  init() {
    this._super(...arguments);
    defineProperty(this, 'options', computed.apply(this, [...MASONRY_OPTION_KEYS, this._computeOptions]));
  },

  didUpdateAttrs() {
    this._super(...arguments);

    const shouldRebuild = MASONRY_OPTION_KEYS.any((option) => {
      return (get(this, `_cachedOptions.${option}`) !== get(this, `options.${option}`));
    });

    if (shouldRebuild) {
      this._destroyMasonry();
    }
  },

  didReceiveAttrs() {
    set(this, '_cachedOptions', get(this, 'options'));
  },

  didInsertElement() {
    this._super(...arguments);

    this._initializeMasonry();
  },

  didRender() {
    this._super(...arguments);

    Ember.run.scheduleOnce('afterRender', this, () => {
      let masonry = get(this, 'masonry');
      let imageWatcher = new imagesLoaded(get(this, 'element'));

      if (!masonry) {
        masonry = this._initializeMasonry();
      }

      masonry.reloadItems();

      imageWatcher.on('progress', () => {
        masonry.layout();
      });

      imageWatcher.on('always', () => {
        this.sendAction('onLayoutComplete', masonry);
      });
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this._destroyMasonry();
  },

  _computeOptions() {
    let options = getProperties(this, MASONRY_OPTION_KEYS);

    Object.keys(options).forEach((key) => {
      if (options[key] === 'null') {
        options[key] = null;
      }

      if (options[key] === undefined) {
        delete options[key];
      }
    });

    return options;
  },

  _initializeMasonry() {
    const options = get(this, 'options');
    return set(this, 'masonry', new Masonry(get(this, 'element'), options));
  },

  _destroyMasonry() {
    let masonry = get(this, 'masonry');

    if (masonry) {
      masonry.destroy();
    }

    set(this, 'masonry', undefined);
  }
});
