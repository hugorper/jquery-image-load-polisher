# jQuery Page Load Polisher [![Build Status](https://travis-ci.org/hugorper/jquery-page-load-polisher.svg?branch=master)](https://travis-ci.org/hugorper/jquery-page-load-polisher)

## A way to polish the loading of a page

jQuery Page Load Polisher polish page load, the plugin displays a loader until your page load and applies an effect when page appear.

## Documentation, Demos & Usage

You can find a [DEMO](https://hugorper.github.com/jquery-page-load-polisher) on the project page.

## Build from source

Clone the repository:

```
git clone https://github.com/hugorper/jquery-page-load-polisher.git
```

Install the npm dependencies:

```
npm install:
```

Build, test & deploy:

```
grunt all
```

## How to use ?

Include jQuery and jQuery Page Load Polisher in your HTML code:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>

<script src="../dist/jquery.page.load.polisher.min.js"></script>
```

## Call the plugin and change settings

### Default configuration: simple page load

```js
$(function() {
	$.pageLoadPolisher()
});
```

### Change background color below the loader

```js
$(function() {
	$.pageLoadPolisher({ "background_color": "red" })
});
```

### Use spinner.js as spinner

```js
function drawFlame(color, px, py, radius) {
	this._.fillStyle = color;
	this._.beginPath();
	this._.arc(px, py, radius, 0, Math.PI*2, false);
	this._.closePath();
	this._.fill();
}

var sonic = new Sonic({

	width: 100,
	height: 100,

	stepsPerFrame: 4,
	trailLength: 0.8,
	pointDistance: 0.01,
	fps: 20,

	backgroundColor: "white",

	path: [
		["arc", 60, 60, 30, 0, 360]
	],

	step: function(point, index) {

		var sizeMultiplier = 10;
		var radius = sizeMultiplier * (index > 0.5 ? 1-index : index);

		drawFlame.call(this, "#FF6C08", point.x*index, point.y, radius);
		drawFlame.call(this, "#FFD341", point.x, point.y*index, radius);
		drawFlame.call(this, "#FF3000", point.x, point.y, radius);
	}
});

$(function() {
	$.pageLoadPolisher({ "sonic": sonic })
});
```

### Settings

Option  | Description
------------- | -------------
loader_fixed_position  | (default true) boolean. True if loader position is responsive
effect_duration  | (default 1300) int. Effect duration milliseconds
sonic  | Sonic object that replace the loader
background_color  | (default #FFFFFF). Background color
loader_source  | (default data64 image). Image path _src_ of the loader image

## License

[MIT License](http://hugorper.mit-license.org/) © Hugo Pereira (hugorper.com)
