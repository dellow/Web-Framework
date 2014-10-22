/* ======================================================== */
/* PageController
/* Adds Ajax loading to page.
/* Just add '<a href="link.php" data-push="true">Page 2</a>'
/* to any link that needs to be loaded with Ajax
/* ======================================================== */
// Require
require('../plugins/wiselinks');

;(function(Module, $, window, undefined){
	'use strict';

	/**
	 * Module.init
	 * Init method for this module
	**/
	Module.init = function(){
		$(function(){
            // Run page load events.
			Module.page_load();
			// Init WiseLinks
			window.wiselinks = new Wiselinks($('.main'));
			// WiseLinks events
			$(document).off('page:loading').on('page:loading', function(event, $target, render, url){
	            Helpers.log("Loading: " + url + " to " + $target.selector + " within '" + render);
		    });

			$(document).off('page:redirected').on('page:redirected', function(event, $target, render, url){
	            Helpers.log("Redirected to: " + url);
		    });

			$(document).off('page:always').on('page:always', function(event, xhr, settings){
	            Helpers.log("Wiselinks page loading completed");
            	// Run page load events.
				Module.page_load();
		    });

			$(document).off('page:done').on('page:done', function(event, $target, status, url, data){
	            Helpers.log("Wiselinks status: '" + status);
		    });

			$(document).off('page:fail').on('page:fail', function(event, $target, status, url, error, code){
	            Helpers.log("Wiselinks status: '" + status);
		    });
	    });
	}

	/**
	 * Module.page_load
	 * Run on page load.
	**/
	Module.page_load = function(){
	}

	// Export
	module.exports = PageController;

}(window.PageController = window.PageController || {}, jQuery, window));