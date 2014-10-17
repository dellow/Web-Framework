/* ======================================================== */
/* ModuleEqualHeights
/* ======================================================== */
;(function(Module, $, window, undefined){
    'use strict';

    /**
     * Module.init
     * Initialise the module.
    **/
    Module.init = function(){
        Module.binds();
    }

    /**
     * Module.binds
     * Bind to DOM elements.
    **/
    Module.binds = function(){
        $('.eh').each(function(){
            Module.boxes = $('[data-eh="true"]', $(this));
            // Set the breakpoints
            var breakpoints = ($(this).data('eh-breakpoints')) ? $(this).data('eh-breakpoints').split('|') : [320, 9999];
            // Go!
            Module.watch_window(breakpoints[0], breakpoints[1]);
        });
    }

    /**
     * Module.calculate
     * Calculate and apply the correct heights.
    **/
    Module.calculate = function(){
        // Reset the height attribute to `auto` (or nothing).
        Module.reset_heights();
        // Map all qualifying element heights to an array.
        var heights = Module.boxes.map(function(){
            return $(this).outerHeight();
        }).get();
        // Get the largest value from the array.
        var large = Math.max.apply(Math, heights);
        // Apply the CSS height to all qualifying elements.
        Module.boxes.each(function(){
            $(this).outerHeight(large);
        });
    }

    /**
     * Module.watch_window
     * Watches the window size and checks if breakpoints apply.
    **/
    Module.watch_window = function(breakpoint1, breakpoint2){
        $(window).on('load resize', function(){
            if($(window).width() > breakpoint1 && $(window).width() < breakpoint2){
                Module.calculate();
            }
            else{
                Module.reset_heights();
            }
        });
    }

    /**
     * Module.reset_heights
     * Reset all box heights.
    **/
    Module.reset_heights = function(){
        // Reset the height attribute to `auto` (or nothing).
        Module.boxes.each(function(){
            $(this).css({'height': 'auto'});
        });
    }

    // Export
    module.exports = Module;

}(window.ModuleEqualHeights = window.ModuleEqualHeights || {}, jQuery, window));