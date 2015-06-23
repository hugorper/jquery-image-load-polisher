/*
 *  jquery-page-load-polisher - v1.2.0
 *  jQuery Page Load Polisher polish page load.
 *  http://hugorper.com
 *
 *  Made by Hugo Pereira
 *  Under MIT License
 */
// the semi-colon is a safety net against concatenated scripts and/or not closed properly plugins. The two first javascript code block fix the flash effect on page load
;(setTimeout(function() {document.getElementsByTagName("html")[0].style.visibility = "visible";}, 500));
document.getElementsByTagName("html")[0].style.visibility = "hidden";
(function ($, window, document, undefined) {

	"use strict";

	// Create the defaults settings once
	var pluginName = "pageLoadPolisher",
			defaults = {
				loader_fixed_position: true,
				effect_duration: 1300,
				sonic: "none",
				background_color: "#ffffff",
				loader_source: "data:image/gif;base64,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"
			};

	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			var $loader = $("<div>").attr("id", "page-load-container");

			$loader.css({
				position: "absolute",
				top: 0,
				left: 0,
				"z-index": 2147483647,
				"text-align": "center",
				font: "0/0 a",
				"background-color": this.settings.background_color
			});

			// with fixed size div, the loader doesn't move
			if (this.settings.loader_fixed_position === true) {
				$loader.css({
					width: $(window).width(),
					height: $(window).height()
				});
			}
			else {
				$loader.css({
					bottom: 0,
					right: 0
				});
			}

			var $centered = $("<div>");
			$centered.css({
				display: "inline-block",
				"vertical-align": "middle",
				height: "100%"
			});

			$loader.append($centered);

			if (this.settings.sonic === "none") {
				$("<img>").attr("src", this.settings.loader_source).css({
					"vertical-align": "middle",
					display: "inline-block",
					"max-width": "100%",
					"max-height": "100%"
				}).load(function () {
					$(this).appendTo($loader);
				});
			}
			else {
				this.settings.sonic.play();
				$(this.settings.sonic.canvas).appendTo($loader);
			}


			$("body").append($loader);

			var effectDuration = this.settings.effect_duration;
			$(window).load(function () {
				$("#page-load-container").fadeOut(effectDuration);
			});
		}
	});

	// Lightweight plugin wrapper preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		if (!$.data(this, "plugin_" + pluginName)) {
			$.data(this, "plugin_" + pluginName, new Plugin(this, options));
		}
	};
})(jQuery, window, document);

/*
 * Sonic 0.2.1
 * --
 * https://github.com/padolsey/Sonic
 * --
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 

(function(){

	var emptyFn = function(){};

	function Sonic(d) {

		this.converter = d.converter;

		this.data = d.path || d.data;
		this.imageData = [];

		this.multiplier = d.multiplier || 1;
		this.padding = d.padding || 0;

		this.fps = d.fps || 25;

		this.stepsPerFrame = ~~d.stepsPerFrame || 1;
		this.trailLength = d.trailLength || 1;
		this.pointDistance = d.pointDistance || .05;

		this.domClass = d.domClass || 'sonic';

		this.backgroundColor = d.backgroundColor || 'rgba(0,0,0,0)';
		this.fillColor = d.fillColor;
		this.strokeColor = d.strokeColor;

		this.stepMethod = typeof d.step == 'string' ?
			stepMethods[d.step] :
			d.step || stepMethods.square;

		this._setup = d.setup || emptyFn;
		this._teardown = d.teardown || emptyFn;
		this._preStep = d.preStep || emptyFn;

		this.pixelRatio = d.pixelRatio || null;

		this.width = d.width;
		this.height = d.height;

		this.fullWidth = this.width + 2 * this.padding;
		this.fullHeight = this.height + 2 * this.padding;

		this.domClass = d.domClass || 'sonic';

		this.setup();

	}

	var argTypes = Sonic.argTypes = {
		DIM: 1,
		DEGREE: 2,
		RADIUS: 3,
		OTHER: 0
	};

	var argSignatures = Sonic.argSignatures = {
		arc: [1, 1, 3, 2, 2, 0],
		bezier: [1, 1, 1, 1, 1, 1, 1, 1],
		line: [1,1,1,1]
	};

	var pathMethods = Sonic.pathMethods = {
		bezier: function(t, p0x, p0y, p1x, p1y, c0x, c0y, c1x, c1y) {
			
		    t = 1-t;

		    var i = 1-t,
		        x = t*t,
		        y = i*i,
		        a = x*t,
		        b = 3 * x * i,
		        c = 3 * t * y,
		        d = y * i;

		    return [
		        a * p0x + b * c0x + c * c1x + d * p1x,
		        a * p0y + b * c0y + c * c1y + d * p1y
		    ]

		},
		arc: function(t, cx, cy, radius, start, end) {

		    var point = (end - start) * t + start;

		    var ret = [
		        (Math.cos(point) * radius) + cx,
		        (Math.sin(point) * radius) + cy
		    ];

		    ret.angle = point;
		    ret.t = t;

		    return ret;

		},
		line: function(t, sx, sy, ex, ey) {
			return [
				(ex - sx) * t + sx,
				(ey - sy) * t + sy
			]
		}
	};

	var stepMethods = Sonic.stepMethods = {
		
		square: function(point, i, f, color, alpha) {
			this._.fillRect(point.x - 3, point.y - 3, 6, 6);
		},

		fader: function(point, i, f, color, alpha) {

			this._.beginPath();

			if (this._last) {
				this._.moveTo(this._last.x, this._last.y);
			}

			this._.lineTo(point.x, point.y);
			this._.closePath();
			this._.stroke();

			this._last = point;

		}

	}

	Sonic.prototype = {

		calculatePixelRatio: function(){

			var devicePixelRatio = window.devicePixelRatio || 1;
			var backingStoreRatio = this._.webkitBackingStorePixelRatio
					|| this._.mozBackingStorePixelRatio
					|| this._.msBackingStorePixelRatio
					|| this._.oBackingStorePixelRatio
					|| this._.backingStorePixelRatio
					|| 1;

			return devicePixelRatio / backingStoreRatio;
		},

		setup: function() {

			var args,
				type,
				method,
				value,
				data = this.data;

			this.canvas = document.createElement('canvas');
			this._ = this.canvas.getContext('2d');

			if(this.pixelRatio == null){
				this.pixelRatio = this.calculatePixelRatio();
			}

			this.canvas.className = this.domClass;

			if(this.pixelRatio != 1){

				this.canvas.style.height = this.fullHeight + 'px';
				this.canvas.style.width = this.fullWidth + 'px';

				this.fullHeight *= this.pixelRatio;
				this.fullWidth  *= this.pixelRatio;

				this.canvas.height = this.fullHeight;
				this.canvas.width = this.fullWidth;

				this._.scale(this.pixelRatio, this.pixelRatio);

			}   else{

				this.canvas.height = this.fullHeight;
				this.canvas.width = this.fullWidth;

			}

			this.points = [];

			for (var i = -1, l = data.length; ++i < l;) {

				args = data[i].slice(1);
				method = data[i][0];

				if (method in argSignatures) for (var a = -1, al = args.length; ++a < al;) {

					type = argSignatures[method][a];
					value = args[a];

					switch (type) {
						case argTypes.RADIUS:
							value *= this.multiplier;
							break;
						case argTypes.DIM:
							value *= this.multiplier;
							value += this.padding;
							break;
						case argTypes.DEGREE:
							value *= Math.PI/180;
							break;
					};

					args[a] = value;

				}

				args.unshift(0);

				for (var r, pd = this.pointDistance, t = pd; t <= 1; t += pd) {
					
					// Avoid crap like 0.15000000000000002
					t = Math.round(t*1/pd) / (1/pd);

					args[0] = t;

					r = pathMethods[method].apply(null, args);

					this.points.push({
						x: r[0],
						y: r[1],
						progress: t
					});

				}

			}

			this.frame = 0;

			if (this.converter && this.converter.setup) {
				this.converter.setup(this);
			}

		},

		prep: function(frame) {

			if (frame in this.imageData) {
				return;
			}

			this._.clearRect(0, 0, this.fullWidth, this.fullHeight);
			this._.fillStyle = this.backgroundColor;
			this._.fillRect(0, 0, this.fullWidth, this.fullHeight);

			var points = this.points,
				pointsLength = points.length,
				pd = this.pointDistance,
				point,
				index,
				frameD;

			this._setup();

			for (var i = -1, l = pointsLength*this.trailLength; ++i < l && !this.stopped;) {

				index = frame + i;

				point = points[index] || points[index - pointsLength];

				if (!point) continue;

				this.alpha = Math.round(1000*(i/(l-1)))/1000;

				this._.globalAlpha = this.alpha;

				if (this.fillColor) {
					this._.fillStyle = this.fillColor;
				}
				if (this.strokeColor) {
					this._.strokeStyle = this.strokeColor;
				}

				frameD = frame/(this.points.length-1);
				indexD = i/(l-1);

				this._preStep(point, indexD, frameD);
				this.stepMethod(point, indexD, frameD);

			} 

			this._teardown();

			this.imageData[frame] = (
				this._.getImageData(0, 0, this.fullWidth, this.fullWidth)
			);

			return true;

		},

		draw: function() {
			
			if (!this.prep(this.frame)) {

				this._.clearRect(0, 0, this.fullWidth, this.fullWidth);

				this._.putImageData(
					this.imageData[this.frame],
					0, 0
				);

			}

			if (this.converter && this.converter.step) {
				this.converter.step(this);
			}

			if (!this.iterateFrame()) {
				if (this.converter && this.converter.teardown) {
					this.converter.teardown(this);
					this.converter = null;
				}
			}

		},

		iterateFrame: function() {
			
			this.frame += this.stepsPerFrame;
			
			if (this.frame >= this.points.length) {
				this.frame = 0;
				return false;
			}

			return true;

		},

		play: function() {

			this.stopped = false;

			var hoc = this;

			this.timer = setInterval(function(){
				hoc.draw();
			}, 1000 / this.fps);

		},
		stop: function() {

			this.stopped = true;
			this.timer && clearInterval(this.timer);

		}
	};

	window.Sonic = Sonic;

}());
