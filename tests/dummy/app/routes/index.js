import Ember from 'ember';

const {
  A,
  Route,
  run
} = Ember;

export default Route.extend({
  item: {
    imgsrc: 'http://placehold.it/350x150',
    name: 'Mittens'
  },

  model() {
    let model = A([
      A(),
      A()
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
    run(() => {
      model.pushObject(Object.create(this.get('item')));
    });
  },

  _prependItemToModel(model) {
    run(() => {
      model.insertAt(0, Object.create(this.get('item')));
    });
  }
});
