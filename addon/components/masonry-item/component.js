import Ember from 'ember';
import layout from './template';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  layout,
  classNameBindings: ['itemClass'],
  attributeBindings: ['style:masonryItemStyle'],

  masonryItemStyle: computed(function() {
    return 'position: absolute';
  }),

  click(ev) {
    this.sendAction('onItemClick', ev, get(this, 'item'));
  },

  itemClass: computed.oneWay('grid.itemClass')
});
