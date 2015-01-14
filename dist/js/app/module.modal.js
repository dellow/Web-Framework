/**
 *
 * Module
 *
 * Copyright 2014, Stew Dellow
 * Some information on the license.
 *
**/

// Require
require('../plugins/jquery.modals');

;(function(Module, $, window, undefined){
	'use strict';

	/**
	 * Module.init
	 * Init module.
	**/
	Module.init = function(){
		Module.binds();

		if(typeof modal_window_content !== 'undefined'){
			// Defaults.
			var modal_window_type = (typeof modal_window_type === 'undefined') ? 'modal-slide-left' : modal_window_type;
			// Run.
			Module.run(modal_window_type, modal_window_content);
		}
	}

	/**
	 * Module.binds
	 * jQuery event Binds.
	**/
	Module.binds = function(){
		$('.js-modal').modal();
	}

	/**
	 * Module.run
	 * Run modal window without click event.
	**/
	Module.run = function(type, content){
		// Run modal.
		$(window).modal({
			type   : type,
			content: content
		});
	}

	/**
	 * Module.destroy
	 * Destroy all modal windows currently running
	**/
	Module.destroy = function(){
		$(window).destroyModal();
	}

	// Export
	module.exports = Modal;

}(window.Modal = window.Modal || {}, jQuery, window));