/**
 *
 * Equal Heights
 * jquery.equal-heights.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.js-eh').equalHeights();
 *
**/

;(function($, window, undefined){
    'use strict';

    // Set helpers.
    var helpers = {};

    /**
     * Plugin
     * Return a unique plugin instance.
    **/
    var Plugin = function(elem, options){
        this.elem     = elem;
        this.$elem    = $(elem);
        this.options  = options;
        this.metadata = this.$elem.data('plugin-options');
    }

    /**
     * $.fn.equalHeights
     * Return a unique plugin instance.
    **/
    $.fn.equalHeights = function(options){
        return this.each(function(){
            new Plugin(this, options).init();
        });
    };

    /**
     * $.fn.equalHeights.defaults
     * Default options.
    **/
    $.fn.equalHeights.defaults = {
        widths: false
    }

    /**
     * Plugin.prototype
     * Init.
    **/
    Plugin.prototype = {
        init: function(){
            // this
            var _self = this;

            // Global settings.
            _self.settings = $.extend({}, $.fn.equalHeights.defaults, _self.options);
            // Run the plugin.
            _self.run();

            return _self;
        },
        run: function(){
            // Set the breakpoints
            var breakpoints = (this.$elem.data('eh-breakpoints')) ? this.$elem.data('eh-breakpoints').split('|') : [320, 9999];
            // Go!
            this.watch_window(this.$elem, breakpoints[0], breakpoints[1]);
        },
        calculate: function(el){
            var _self = this;

            var boxes = $('[data-eh="true"]', el);
            // Reset the height attribute to `auto` (or nothing).
            this.reset_sizes(el);
            // Map all qualifying element heights to an array.
            var heights = boxes.map(function(){
                return $(this).height();
            }).get();
            // Map all qualifying element heights to an array.
            var widths = boxes.map(function(){
                return $(this).outerWidth() + $(this).css('margin-left');
            }).get();
            // Get the largest value from the array.
            var large_height = Math.max.apply(Math, heights);
            var large_width = Math.max.apply(Math, widths);
            // Apply the CSS height to all qualifying elements.
            boxes.each(function(){
                $(this).height(large_height);
                // Are we doing widths?
                if(_self.settings.widths){
                    $(this).css({'min-width': large_width});
                }
            });
        },
        watch_window: function(el, breakpoint1, breakpoint2){
            var _self = this;

            $(function(){
                _self.run_sizes(el, breakpoint1, breakpoint2);
            });
            $(window).on('resize', function(){
                _self.run_sizes(el, breakpoint1, breakpoint2);
            });
        },
        run_sizes: function(el, breakpoint1, breakpoint2){
            var _self = this;

            return ($(window).width() >= breakpoint1 && $(window).width() <= breakpoint2) ?  _self.calculate(el) : _self.reset_sizes(el);
        },
        reset_sizes: function(el){
            var _self = this;

            var boxes = $('[data-eh="true"]', el);
            // Reset the height attribute to `auto` (or nothing).
            boxes.each(function(){
                $(this).css({'height': 'auto'});
                // Are we doing widths?
                if(_self.settings.widths){
                    $(this).css({'min-width': 'none'});
                }
            });
        }
    }

})(jQuery, window);
