import Ember from 'ember';

const {
  Route,
  get
} = Ember;

export default Route.extend({
  images: [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/look-out.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/one-world-trade.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/cat-nose.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/contrail.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/golden-hour.jpg',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/flight-formation.jpg'
  ],

  model() {
    let model = Ember.A([
      Ember.A(),
      Ember.A()
    ]);

    model.forEach((obj) => {
      for (let i = 0; i < 20; i++) {
        this._appendItemToModel(obj, i);
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

  _appendItemToModel(model, i) {
    Ember.run(() => {
      model.pushObject(Object.create({
        imgsrc: get(this, 'images')[Math.floor(Math.random() * get(this, 'images.length'))]
      }));
    });
  },

  _prependItemToModel(model) {
    Ember.run(() => {
      model.insertAt(0, Object.create({
        imgsrc: get(this, 'images')[Math.floor(Math.random() * get(this, 'images.length'))]
      }));
    });
  }
});
