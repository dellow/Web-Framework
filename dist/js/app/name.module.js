/* ======================================================== */
/* ModuleName
/* ======================================================== */
;(function(Module, $, window, undefined){
	'use strict';

	/**
	 * Module.init
	 * Init method for this module
	**/
	Module.init = function(){
		Module.binds();
	}

	/**
	 * Module.method2
	 * A method description
	**/
	Module.method2 = function(){
		return 'Module Method 2';
	}

	/**
	 * Module.binds
	 * Binds related to this module
	**/
	Module.binds = function(){
		$('.element').on('click', function(){
			// Click events here
		});
	}

	// Export
	module.exports = Module;

}(window.ModuleName = window.ModuleName || {}, jQuery, window));