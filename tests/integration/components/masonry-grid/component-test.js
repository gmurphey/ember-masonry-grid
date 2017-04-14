import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let items;

moduleForComponent('masonry-grid', 'Integration | Component | masonry grid', {
  integration: true,

  beforeEach() {
    items = [
      { name: 'one' },
      { name: 'two' }
    ];
  }
});

test('it renders a default layout', function(assert) {
  let $grid;
  let $items;

  assert.expect(4);

  Ember.run(() => {
    this.set('items', Ember.A(items));
  });

  this.render(hbs`
    {{#masonry-grid items=items as |item|}}
      {{item.name}}
    {{/masonry-grid}}
  `);

  $grid = this.$('.masonry-grid');
  $items = $grid.find('.masonry-item');

  assert.ok($grid.length, 'the masonry-grid component renders');
  assert.equal($items.length, 2, 'there is a masonry-item for every item');

  $items.each(function(index) {
    assert.equal(Ember.$(this).text().trim(), items[index].name);
  });
});

test('the masonry-item class is based on the itemSelector passed to masonry-grid', function(assert) {
  let $items;

  assert.expect(1);

  Ember.run(() => {
    this.set('items', Ember.A(items));
    this.set('customSelector', '.piece');
  });

  this.render(hbs `
    {{#masonry-grid items=items itemSelector=customSelector as |item|}}
      {{item.name}}
    {{/masonry-grid}}
  `);

  $items = this.$('.piece');

  assert.equal($items.length, items.length, 'there is a masonry-item for ever item');
});

test('it renders a custom layout', function(assert) {
  let $grid;
  let $items;

  assert.expect(4);

  Ember.run(() => {
    this.set('items', Ember.A(items));
  });

  this.render(hbs`
    {{#masonry-grid items=items customLayout=true as |item index grid|}}
      {{#masonry-item grid=grid item=item}}
        {{item.name}}
      {{/masonry-item}}
    {{/masonry-grid}}
  `);

  $grid = this.$('.masonry-grid');
  $items = $grid.find('.masonry-item');

  assert.ok($grid.length, 'the masonry-grid component renders');
  assert.equal($items.length, 2, 'there is a masonry-item for every item');

  $items.each(function(index) {
    assert.equal(Ember.$(this).text().trim(), items[index].name);
  });
});

test('it triggers masonry\'s layoutComplete event after rendering', function(assert) {
  assert.expect(1);

  Ember.run(() => {
    this.set('items', Ember.A(items));
    this.on('layoutComplete', () => {
      assert.ok(true, 'layoutComplete action called');
    });
  });

  this.render(hbs `
    {{#masonry-grid items=items onLayoutComplete=(action 'layoutComplete')}}
      {{item.name}}
    {{/masonry-grid}}
  `);
});

test('it triggers a click event when an item is clicked', function(assert) {
  assert.expect(1);

  this.set('items', Ember.A(items));

  this.on('itemClicked', (ev, item) => {
    assert.deepEqual(this.get('items.firstObject'), item);
  });

  this.on('layoutComplete', () => {
    let $items = this.$('.masonry-item');
    $items.first().click();
  });

  this.render(hbs `
    {{#masonry-grid items=items onItemClick=(action 'itemClicked') onLayoutComplete='layoutComplete' as |item|}}
      {{item.name}}
    {{/masonry-grid}}
  `);
});
