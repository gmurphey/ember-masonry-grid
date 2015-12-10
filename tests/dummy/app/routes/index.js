import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  item: {
    imgsrc: 'http://placehold.it/350x150',
    name: 'Mittens'
  },

  model() {
    let model = Ember.A([
      Ember.A(),
      Ember.A()
    ]);

    model.forEach((obj) => {
      for (let i = 0; i < 20; i++) {
        this._appendItemToModel(obj);
      }
    });

    return model;
  },

  actions: {
    appendItem(model) {
      this._appendItemToModel(model);
    },

    prependItem(model) {
      this._prependItemToModel(model);
    }
  },

  _appendItemToModel(model) {
    Ember.run(() => {
      model.pushObject(Object.create(this.get('item')));
    });
  },

  _prependItemToModel(model) {
    Ember.run(() => {
      model.insertAt(0, Object.create(this.get('item')));
    });
  }
});
