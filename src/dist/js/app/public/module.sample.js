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
        var _this = this;

        // Document ready.
        $(function(){
            // Click event.
            $('.js-mn-trigger').on('click', $.proxy(_this.init, _this));
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
        // Globally cache this element.
        this.$self = $(e.currentTarget);
        // Vars.
        var data_attr = self.data('sample') || false;

        // Check a data attribute exists.
        if(data_attr){
            this.some_method(data_attr);
        }
        else{
            Helpers.log("Some message here.", "negative");
        }
    }

    /**
     * some_method
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.some_method = function(data_attr){
        return this.do_action_with_data();
    }

    // Export
    module.exports = new Module();

}(function(){}, window));