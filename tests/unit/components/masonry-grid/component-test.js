import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('masonry-grid', 'Unit | Component | masonry grid', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('the options hash has the correct defaults', function(assert) {
  let component = this.subject();

  assert.deepEqual(component.get('options'), {
    isInitLayout: false,
    itemSelector: '.masonry-item'
  });
});

test('the options hash handles "null" as a primitive type', function(assert) {
  let component = this.subject();

  component.set('containerStyle', 'null');

  assert.deepEqual(component.get('options'), {
    isInitLayout: false,
    itemSelector: '.masonry-item',
    containerStyle: null
  });
});

test('the options hash updates when masonry properties are changed', function(assert) {
  let component = this.subject();

  component.set('transitionDuration', '1s');

  assert.deepEqual(component.get('options'), {
    isInitLayout: false,
    itemSelector: '.masonry-item',
    transitionDuration: '1s'
  });

  component.set('transitionDuration', '0.5s');

  assert.equal(component.get('options.transitionDuration'), '0.5s');
});
