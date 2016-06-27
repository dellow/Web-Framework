/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Module, window, undefined){
    'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
    }

    /**
     * events
     * Event listeners for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.events = Public.events.extend({
		events: {
			'click .js--moduleName--trigger': 'method'
		},
        method: function(e){
            // // Globally cache this element.
            // this.$self = $(e.currentTarget);
            // // Data attribute.
            // var data_attr = self.data('sample') || false;

            alert('Target clicked.');
		}
    });

    // Export
    module.exports = new Module();

}(function(){}, window));