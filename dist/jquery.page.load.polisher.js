/*
 *  jquery-page-load-polisher - v0.0.0
 *  jQuery Image Load Polisher polish imaged load.
 *  http://hugorper.com
 *
 *  Made by Hugo Pereira
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

	// use image width height if possible
	var ImageEffect = {
		FadeIn: "FADE_IN",
		None: "NONE"
	};
	window.load_delay_executed = false;

	// Create the defaults seetings once
	var pluginName = "pageLoadPolisher",
			defaults = {
				image_effect: ImageEffect.FadeIn,
				image_appear_duration: 1300, // number that determine how long image animation will run
				loader_disappear_duration: 800,
				loader_source: "data:image/gif;base64,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",
				loader_horizontal_position_percent: 50,
				loader_vertical_position_percent: 50,
				empty_image_source: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRENTVEOTg0MDU3MzExRTU5REYwRTYxRkJEQjcwMUUwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk2MkQyMjc4MDU3NDExRTU5REYwRTYxRkJEQjcwMUUwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REQ1NUQ5ODIwNTczMTFFNTlERjBFNjFGQkRCNzAxRTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REQ1NUQ5ODMwNTczMTFFNTlERjBFNjFGQkRCNzAxRTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAAQABAAACAkQBADs="
			};

	// Private vars
	var pluginSettings;
	var image_array = [];
	var empty_image_array = [];
	var loader_array = [];

	var loadDelay = function() {
		var image_item;
		var array_len = image_array.length;

		window.load_delay_executed = true;

		for (var i = 0; i < array_len; i++) {
			image_item = image_array[i];
			if ($(image_item).attr("data-load-delay-executed") === "true") {
				showLoadedImage(image_item);
				$(image_item).removeAttr("data-load-delay-executed");

			}
		}
	};
	setTimeout(loadDelay, 20);

	var terminateLoading = function() {
		var image_item;
		var array_len = image_array.length;

		for (var i = 0; i < array_len; i++) {
			image_item = image_array[i];
			var image_source = image_item.attr("src");

			image_item.attr({
				"data-image-index": i,
				src: ""
			});

			image_item.load(function() {
				if (window.load_delay_executed) {
					return showLoadedImage(this);
				}
				else {
					return $(this).attr("data-load-delay-executed", true);
				}
			}).attr({
				src: image_source
			});
		}
	};

	var showLoadedImage = function(image) {
		var $image, index;
		$image = $(image);
		index = $image.attr("data-image-index");
		empty_image_array[index].replaceWith($image);

		if (pluginSettings.image_effect === ImageEffect.FadeIn) {
			loader_array[index].fadeOut(pluginSettings.loader_disappear_duration, function() {
				return $(this).remove();
			});
		}
		else {
			loader_array[index].remove();
		}

		return $image.fadeOut(0).fadeIn(pluginSettings.image_appear_duration);
	};

	// Plugin constructor
	function Plugin ( element, options ) {
		this.element = element;

		this.settings = $.extend( {}, defaults, options );
		pluginSettings = this.settings;
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			var $img = $(this.element);
			if (! $img.is("img")) {
				var errorMessage = "init(): " + pluginName + " only support images";
				console.log(errorMessage);
				throw new Error(errorMessage);
			}
			// exclude hidden elements
			// jQuery does not support getting the offset coordinates of hidden elements
			if ($img.is(":visible")) {
				var offset = $img.offset();
				var imgInfo = {
					top: offset.top,
					left: offset.left,
					width: $img.width(),
					height: $img.height()
				};
				var $empty_image = $("<img>", {
					src: this.settings.empty_image_source,
					width: imgInfo.width,
					height: imgInfo.height
				});
				var $loader =  $("<img>");

				var horizontal_position = imgInfo.left + ((imgInfo.width / 100) * this.settings.loader_horizontal_position_percent);
				var vertical_position = imgInfo.top + ((imgInfo.height / 100) * this.settings.loader_vertical_position_percent);
				$loader.load(function() {
					$(this).css({
						position: "absolute",
						"z-index": 2147483647,
						left:  horizontal_position - $(this).width() / 2,
						top: vertical_position - $(this).height() / 2
					});
				});

				$loader.attr({
					src: this.settings.loader_source
				});

				image_array.push($img.replaceWith($empty_image));
				loader_array.push($loader);
				empty_image_array.push($empty_image);

				$("body").append($loader);
			}
		},
		imageEffectEnum: function () {
			return ImageEffect;
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
			terminateLoading();
		});
	};

})( jQuery, window, document );