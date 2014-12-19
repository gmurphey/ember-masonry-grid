# ember-masonry-grid
This `ember-cli` addon imports the Masonry library and allows you to quickly and easily build masonry grid views.

## Installation
`npm install --save-dev ember-masonry-grid`

That's it! The Masonry library will automatically be imported in your app, and the `masonry-grid` component will be available to all of your templates.

## `masonry-grid`
The `masonry-grid` component accepts all of the options that `Masonry` exposes. The naming is the same, and any option not specified will use the `Masonry` default.

For example, if we wanted to a basic `Masonry` view, we'd included the following in our template.

```
{{#masonry-grid}}
	<div class="item">Item 1</div>
	<div class="item">Item 2</div>
	<div class="item">Item 3</div>
{{/masonry-grid}}
```

If we wanted to redefine the `item` class for `Masonry`, we'd write the following:

```
{{#masonry-grid itemSelector=".piece"}}
	<div class="piece">Item 1</div>
	<div class="piece">Item 2</div>
	<div class="piece">Item 3</div>
{{/masonry-grid}}
```

For a full list of options that are exposed, please see the [Masonry options](http://masonry.desandro.com/options.html).

*A small caveat: while Ember allows us to pass most options to components as primitives, it doesn't handle `null` well. If you'd like to use `null` (as `containerStyle`, for example), you'll have to wrap it in quotes (`'null'`).*

### Adding and Removing Items from a Masonry Layout

We can specify an `items` attribute that `ember-masonry-grid` will observe. When the property changes, Masonry will re-initalize itself and update its layout.

For example, if our controller exposes the enumerable property `colors`:

```
{{#masonry-grid items=colors}}
  {{#each colors}}
  <div class="item">
    Name: {{name}}
  </div>
  {{/each}}
{{/masonry-grid}}
```

Every time the length of the `colors` property is changed, Masonry will account for it and generate a new layout.

## Contributing
If you find an issue or missing functionality, please don't hesistate to open a pull request.

### Installation
* `git clone` this repository
* `npm install`
* `bower install`

### Running
* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests
* `ember test`
* `ember test --server`

### Building
* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
