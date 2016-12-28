import { moduleForComponent, test } from 'ember-qunit';
import sinon from 'sinon';

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

test('didUpdateAttrs destroys masonry if any options have changed', function(assert) {
  let component = this.subject();
  let args = [{
    oldAttrs: {
      gutter: 0
    },
    newAttrs: {
      gutter: 10
    }
  }];

  component._destroyMasonry = sinon.stub();

  component.didUpdateAttrs(...args);

  assert.ok(component._destroyMasonry.calledOnce, 'masonry was destroyed');
});

test('didUpdateAttrs does nothing if no masonry-specific options were changed', function(assert) {
  let component = this.subject();
  let args = [{
    oldAttrs: {
      gutter: 10
    },
    newAttrs: {
      gutter: 10
    }
  }];

  component._destroyMasonry = sinon.stub();

  component.didUpdateAttrs(...args);

  assert.ok(component._destroyMasonry.notCalled, 'masonry is not destroyed');
});
