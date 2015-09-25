/**
 *
 * Module
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

;(function(Module, $, window, undefined){
    'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
        var _this = this;

        // Document ready.
        $(function(){
            // Click event.
            $('.js-mn-trigger').on('keyup', $.proxy(_this.init, _this));
        });
    }

    /**
     * init
     * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.init = function(e){
        var self = $(e.currentTarget),
            data = self.data('sample') || false;

        // Check a data attribute exists.
        if(data){
            this.method(self);
        }
        else{
            Helpers.log("Some message here.", "negative");
        }
    }

    /**
     * method
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.method = function(self){
        // Apply limit.
        return self.doaction();
    }

    // Export
    module.exports = new Module();

}(window.M = window.M || function(){}, jQuery, window));
