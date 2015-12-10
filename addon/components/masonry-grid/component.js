/* global imagesLoaded, Masonry */
import Ember from 'ember';
import layout from './template';

const {
  Component,
  computed,
  observer,
  defineProperty,
  get,
  set
} = Ember;

const {
  htmlSafe
} = Ember.String;

const MASONRY_OPTION_KEYS = [
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
];

export default Component.extend({
  layout,
  classNames: ['masonry-grid'],
  attributeBindings: ['masonryGridStyle:style'],

  masonryGridStyle: htmlSafe('position: relative'),

  // masonry default options
  // overriding the default `isInitLayout` value allows us to attach an event for
  // `layoutComplete` before the first render
  isInitLayout: false,
  itemSelector: '.masonry-item',

  items: Ember.A(),
  customLayout: false,
  masonry: null,

  itemClass: computed('itemSelector', function() {
    return get(this, 'itemSelector').replace('.', '');
  }),

  didInsertElement() {
    this._super(...arguments);

    defineProperty(this, 'options', computed(MASONRY_OPTION_KEYS, this._createOptionsHash));
    this.layoutMasonry();
  },

  willDestroyElement() {
    this._super(...arguments);

    get(this, 'masonry').destroy();
  },

  layoutMasonry: observer('items.[]', function() {
    let masonry = get(this, 'masonry');

    Ember.run.scheduleOnce('afterRender', this, () => {
      imagesLoaded(get(this, 'element'), () => {
        if (masonry) {
          masonry.reloadItems();
        } else {
          const options = get(this, 'options');
          masonry = set(this, 'masonry', new Masonry(get(this, 'element'), options));

          masonry.on('layoutComplete', (layout) => {
            this.sendAction('onLayoutComplete', layout);
          });
        }

        masonry.layout();
      });
    });
  }),

  actions: {
    onItemClick() {
      this.sendAction('onItemClick', ...arguments);
    }
  },

  _createOptionsHash() {
    let options = this.getProperties(MASONRY_OPTION_KEYS);

    Object.keys(options).forEach((key) => {
      if (options[key] === 'null') {
        options[key] = null;
      }

      if (options[key] === undefined) {
        delete options[key];
      }
    });

    return options;
  }
});
