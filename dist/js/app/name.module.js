/* ======================================================== */
/* Module Name
/* ======================================================== */
;(function(Module, $, window, undefined){
	'use strict';

	/**
	 * Method.
	**/
	Module.method1 = function(){
		return 'Module Method 1';
	}

	/**
	 * Method.
	**/
	Module.method2 = function(){
		return 'Module Method 2';
	}

	/**
	 * Method.
	**/
	Module.bindEvents = function(){
		$('.element').on('click', function(){
			// Click events here
		});
	}

	// Export
	module.exports = Module;

}(window.ModuleName = window.ModuleName || {}, jQuery, window));