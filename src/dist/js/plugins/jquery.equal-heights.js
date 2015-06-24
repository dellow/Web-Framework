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
     * Plugin.prototype
     * Init.
    **/
    Plugin.prototype = {
        init: function(){
            // this
            var _self = this;

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
            var boxes = $('[data-eh="true"]', el);
            // Reset the height attribute to `auto` (or nothing).
            this.reset_heights(el);
            // Map all qualifying element heights to an array.
            var heights = boxes.map(function(){
                return $(this).height();
            }).get();
            // Get the largest value from the array.
            var large = Math.max.apply(Math, heights);
            // Apply the CSS height to all qualifying elements.
            boxes.each(function(){
                $(this).height(large);
            });
        },
        watch_window: function(el, breakpoint1, breakpoint2){
            var _self = this;

            $(function(){
                _self.run_heights(el, breakpoint1, breakpoint2);
            });
            $(window).on('resize', function(){
                _self.run_heights(el, breakpoint1, breakpoint2);
            });
        },
        run_heights: function(el, breakpoint1, breakpoint2){
            var _self = this;

            if($(window).width() > breakpoint1 && $(window).width() < breakpoint2){
                _self.calculate(el);
            }
            else{
                _self.reset_heights(el);
            }
        },
        reset_heights: function(el){
            var boxes = $('[data-eh="true"]', el);
            // Reset the height attribute to `auto` (or nothing).
            boxes.each(function(){
                $(this).css({'height': 'auto'});
            });
        }
    }

    /**
     * helpers.log
     * Returns a cross-browser safe message in the console.
    **/
    helpers.log = function(message, alertlog){
        alertlog = (typeof alertlog === 'undefined') ? false : true;
        if(typeof console === 'undefined' || typeof console.log === 'undefined'){
            if(alertlog){
                alert(message);
            }
        }
        else {
            console.log(message);
        }
    }

})(jQuery, window);
