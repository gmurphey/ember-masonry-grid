import Ember from 'ember';

export default Ember.ArrayController.extend({
  first: true,
  currentObject: null,

  init: function () {
    this._super.apply(this, arguments);

    var model = [
      { 'items': Ember.A([]) },
      { 'items': Ember.A([]) }
    ];

    model.forEach(function (obj) {
      for (let i = 0; i < 20; i++) {
        obj['items'].push({
          imgsrc: 'https://placekitten.com/g/200/300',
          name: 'Mittens'
        });
      }
    });

    model = Ember.A(model);

    this.set('model', model);
    this.set('currentObject', this.get('model').objectAt(0));
  },

  actions: {
    switchObject: function () {
      this.set('first', !this.get('first'));

      this.set('currentObject', this.get('model').objectAt(this.get('first') ? 0 : 1));
    }
  }
});
