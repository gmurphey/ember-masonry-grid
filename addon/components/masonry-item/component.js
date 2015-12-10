import Ember from 'ember';
import layout from './template';

const {
  Component,
  computed,
  get
} = Ember;

const {
  htmlSafe
} = Ember.String;

export default Component.extend({
  layout,
  classNameBindings: ['itemClass'],
  attributeBindings: ['masonryItemStyle:style'],

  masonryItemStyle: htmlSafe('position: absolute'),

  click(ev) {
    this.sendAction('onItemClick', ev, get(this, 'item'));
  },

  itemClass: computed.oneWay('grid.itemClass')
});
