/**
 *
 * Public
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Public, window, undefined){
	'use strict';

    /**
     * Public
     * Constructor for Public.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
	Public = function(){
		// Require :: Modules
		// We do not need to declare with vars but it allows us to call internal methods externally.
		this.Plugins    = require('./module.plugins');
		this.MobileMenu = require('./module.mobile-menu-side');
    }

	/**
	 * init
	 * Init method.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Public.prototype.init = function(){
	}

	// Export
	module.exports = new Public();

}(window.Public = window.Public || function(){}, window));