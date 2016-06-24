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
	 * events
	 * Public events listeners.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
    Public.prototype.events = {
        events:	{},
        extend: function(args){
            // Extend.
            var extension = $.extend({}, this, args);
            // Setup events.
            $.each(extension.events, function(name, callback){
                extension.register(name, callback);
            });

            return extension;
        },
        register: function(name, callback){
            var _this = this;
            // Cache event.
            var event = name.substr(0, name.indexOf(' '));
            // Cache selector.
            var selector = name.substr(name.indexOf(' ')+1);
            // Add event.
            $(document).on(event, selector, function(e){
                // Append $el to event object
                e.$el = $(this);
                // Event
                if(typeof _this.event === 'function'){
                    e = _this.event(e);
                }
                // Callback
                _this[callback].apply(_this, [e]);
            });
        }
    }

	// Export
	module.exports = new Public();

}(window.Public = window.Public || function(){}, window));