;(function($, window, undefined){
    'use strict';

	$.fn.equalHeights = function(options){
      	// Our application defaults.
      	var defaults = {
      	};

      	// Combine the defaults and custom settings.
      	var settings = $.extend({}, defaults, options);

        // Return.
        return this.each(function(){
            var EH = EH || {};
            var _self = $(this);

            $(function(){
                EH.init();
            });

            /**
             * EH.init
             * Bind to DOM elements.
            **/
            EH.init = function(){
                _self.each(function(){
                    EH.boxes = $('[data-eh="true"]', $(this));
                    // Set the breakpoints
                    var breakpoints = ($(this).data('eh-breakpoints')) ? $(this).data('eh-breakpoints').split('|') : [320, 9999];
                    // Go!
                    EH.watch_window(breakpoints[0], breakpoints[1]);
                });
            }

            /**
             * EH.calculate
             * Calculate and apply the correct heights.
            **/
            EH.calculate = function(){
                // Reset the height attribute to `auto` (or nothing).
                EH.reset_heights();
                // Map all qualifying element heights to an array.
                var heights = EH.boxes.map(function(){
                    return $(this).outerHeight();
                }).get();
                // Get the largest value from the array.
                var large = Math.max.apply(Math, heights);
                // Apply the CSS height to all qualifying elements.
                EH.boxes.each(function(){
                    $(this).outerHeight(large);
                });
            }

            /**
             * EH.watch_window
             * Watches the window size and checks if breakpoints apply.
            **/
            EH.watch_window = function(breakpoint1, breakpoint2){
                $(window).on('load resize', function(){
                    if($(window).width() > breakpoint1 && $(window).width() < breakpoint2){
                        EH.calculate();
                    }
                    else{
                        EH.reset_heights();
                    }
                });
            }

            /**
             * EH.reset_heights
             * Reset all box heights.
            **/
            EH.reset_heights = function(){
                // Reset the height attribute to `auto` (or nothing).
                EH.boxes.each(function(){
                    $(this).css({'height': 'auto'});
                });
            }
        });
    }

})(jQuery, window);