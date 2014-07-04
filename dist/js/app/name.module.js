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
	Module.method3 = function(){
		return 'Module Method 3';
	}

	// Export
	module.exports = Module;

}(window.ModuleName = window.ModuleName || {}, jQuery, window));