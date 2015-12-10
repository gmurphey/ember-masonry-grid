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

  this.set('items', Ember.A(items));

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
    assert.equal($(this).text().trim(), items[index].name);
  });
});

test('the masonry-item class is based on the itemSelector passed to masonry-grid', function(assert) {
  let $items;

  assert.expect(1);

  this.set('items', Ember.A(items));
  this.set('customSelector', '.piece');

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

  this.set('items', Ember.A(items));

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
    assert.equal($(this).text().trim(), items[index].name);
  });
});

test('it reloads masonry when items are added or removed', function(assert) {
  let expectedLength = 2;

  assert.expect(3);

  this.set('items', Ember.A(items));
  this.on('layoutComplete', (layout) => {
    assert.equal(expectedLength, layout.length, 'masonry knows about new and removed items');
  });

  this.render(hbs `
    {{#masonry-grid items=items onLayoutComplete='layoutComplete'}}
      {{item.name}}
    {{/masonry-grid}}
  `);

  expectedLength = 3;

  Ember.run(() => {
    this.get('items').pushObject({ name: 'three' });
  });

  expectedLength = 2;

  Ember.run(() => {
    this.get('items').removeAt(0);
  });
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
    {{#masonry-grid items=items onItemClick='itemClicked' onLayoutComplete='layoutComplete' as |item|}}
      {{item.name}}
    {{/masonry-grid}}
  `);
});
