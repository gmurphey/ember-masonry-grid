import Ember from 'ember';

const {
  Controller,
  get
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

    onLayout() {
      console.log('onLayout', arguments);
    },

    onLayoutComplete() {
      console.log('onLayoutComplete', arguments);
    },

    onItemClick(ev, item) {
      Ember.run(() => {
        get(this, 'currentObject').removeObject(item);
      });
    }
  }
});
