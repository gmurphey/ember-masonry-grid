import Ember from 'ember';
import layout from './template';

const {
  Component,
  computed,
  get,
  String: { htmlSafe }
} = Ember;

export default Component.extend({
  layout,
  classNameBindings: ['itemClass'],
  attributeBindings: ['masonryItemStyle:style'],

  masonryItemStyle: htmlSafe('position: absolute'),

  itemClass: computed.oneWay('grid.itemClass'),

  click(ev) {
    const onItemClick = get(this, 'onItemClick');
    const item = get(this, 'item');

    if (onItemClick && typeof onItemClick === 'function') {
      onItemClick(ev, item);
    }
  }
});
