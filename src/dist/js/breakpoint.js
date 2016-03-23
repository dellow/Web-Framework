/**
 *
 * Breakpoint
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Breakpoint, window, undefined){
	'use strict';

    /**
     * refreshValue
     * Method for retrieving the current breakpoint range and mobile menu..
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Breakpoint.refreshValue = function(){
        // Set the range.
        window.config.current_breakpoint = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/["']/g, "");
        // Set the menu_breakpoint.
        window.config.menu_breakpoint = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, "");
    };

    /**
     * If window is resized, reset the current breakpoint
     *
     * @since 1.0.0
     * @version 1.0.0
 	**/
    $(window).on('load resize', function(){
        // Get current breakpoint.
        Breakpoint.refreshValue();
        // Log it.
        Helpers.log('The current breakpoint is: ' + window.config.current_breakpoint + ' and the mobile menu size is: ' + window.config.menu_breakpoint);
    });

    // Export
    module.exports = Breakpoint;

}({}, window));