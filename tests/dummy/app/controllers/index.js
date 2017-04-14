import Ember from 'ember';

const {
  Controller,
  get,
  Logger: { info },
  set
} = Ember;

export default Controller.extend({
  first: true,

  currentObject: Ember.computed('first', 'model', function() {
    let modelIndex = this.get('first') ? 0 : 1;

    return this.get('model').objectAt(modelIndex);
  }),

  actions: {
    switchObjects() {
      this.toggleProperty('first');
    },

    switchGutter() {
      const gutter = get(this, 'gutter');
      const newGutter = (gutter === 10) ? 0 : 10;

      set(this, 'gutter', newGutter);
    },

    onLayout() {
      info('onLayout', arguments);
    },

    onLayoutComplete() {
      info('onLayoutComplete', arguments);
    },

    onItemClick(ev, item) {
      Ember.run(() => {
        get(this, 'currentObject').removeObject(item);
      });
    }
  }
});
