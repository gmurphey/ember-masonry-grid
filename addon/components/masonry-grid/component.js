/* global Masonry */
import Ember from 'ember';
import imagesLoaded from 'imagesloaded';
import layout from './template';

const {
  Component,
  computed,
  defineProperty,
  getProperties,
  get,
  set,
  String: { htmlSafe },
  run: { scheduleOnce },
  A
} = Ember;

const MASONRY_OPTION_KEYS = A([
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

  didUpdateAttrs(attrsObj) {
    this._super(...arguments);

    let shouldRebuild = MASONRY_OPTION_KEYS.any((option) => {
      return (attrsObj.newAttrs[option] !== attrsObj.oldAttrs[option]);
    });

    if (shouldRebuild) {
      this._destroyMasonry();
    }
  },

  didRender() {
    this._super(...arguments);

    let masonry = get(this, 'masonry');

    scheduleOnce('afterRender', this, () => {
      imagesLoaded(get(this, 'element'), () => {
        if (masonry) {
          masonry.reloadItems();
        } else {
          let options = get(this, 'options');
          masonry = set(this, 'masonry', new Masonry(get(this, 'element'), options));

          masonry.on('layoutComplete', (layout) => {
            this.sendAction('onLayoutComplete', layout);
          });
        }

        masonry.layout();
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

  _destroyMasonry() {
    let masonry = get(this, 'masonry');

    if (masonry) {
      masonry.destroy();
    }

    set(this, 'masonry', undefined);
  }
});
