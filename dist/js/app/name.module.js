/* ======================================================== */
/* ModuleName
/* ======================================================== */
;(function(Module, $, window, undefined){
	'use strict';

	/**
	 * Module.method1
	**/
	Module.method1 = function(){
		return 'Module Method 1';
	}

	/**
	 * Module.method2
	**/
	Module.method2 = function(){
		return 'Module Method 2';
	}

	/**
	 * Module.bindEvents
	**/
	Module.bindEvents = function(){
		$('.element').on('click', function(){
			// Click events here
		});
	}

	// Export
	module.exports = Module;

}(window.ModuleName = window.ModuleName || {}, jQuery, window));