/**
 *
 * Tabs
 * jquery.tabs.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.js-tabs').tabs();
 *
 * setting: Type. Description.
 *
**/

;(function($, window, undefined){
    'use strict';

    /**
     * Plugin
     * Return a unique plugin instance.
    **/
    var Plugin = function(elem, options){
        this.elem     = elem;
        this.$elem    = $(elem);
        this.options  = options;
        this.metadata = this.$elem.data('plugin-options');
    }

    /**
     * $.fn.tabs
     * Return a unique plugin instance.
    **/
    $.fn.tabs = function(options){
        return this.each(function(){
            new Plugin(this, options).init();
        });
    };

    /**
     * $.fn.tabs.defaults
     * Default options.
    **/
    $.fn.tabs.defaults = {
        tab_class       : 'tabs__tab',
        nav_class       : 'tabs__nav',
        target_data_attr: 'tab-target',
        active_tab_class: 'active__tab'
    };

    /**
     * Plugin.prototype
     * Init.
    **/
    Plugin.prototype = {
        init: function(){
            // this
            var _self = this;

            // Global settings.
            _self.settings = $.extend({}, $.fn.tabs.defaults, _self.options);

            // Do jQuery event binds.
            _self.binds();
            // Run the plugin.
            _self.run();

            return _self;
        },
        binds: function(){
        },
        run: function(){
            var _self = this;

            $('.' + _self.settings.tab_class, _self.$elem).hide();
            $('.' + _self.settings.tab_class, _self.$elem).first().show().addClass(_self.settings.active_tab_class);
            $('.' + _self.settings.nav_class + ' li', _self.$elem).first().addClass(_self.settings.active_tab_class);

            $('.' + _self.settings.nav_class + ' li button', _self.$elem).on('click', function(e){
                e.preventDefault();
                var tab_nav    = $(this).parent().parent(),
                    tab_system = tab_nav.next();

                if(!$(this).parent().hasClass(_self.settings.active_tab_class)){
                    var target = $(this).data(_self.settings.target_data_attr);

                    $('li.' + _self.settings.active_tab_class, tab_nav).removeClass(_self.settings.active_tab_class);
                    $(this).parent().addClass(_self.settings.active_tab_class);
                    $('.' + _self.settings.active_tab_class, tab_system).hide().removeClass(_self.settings.active_tab_class);
                    $('#' + target, tab_system).fadeIn(500).addClass(_self.settings.active_tab_class);
                }
            });
        }
    }

    // Set helpers.
    var helpers = {};

    /**
     * helpers.log
     * Returns a cross-browser safe message in the console.
    **/
    helpers.log = function(message, alertlog){
        alertlog = (typeof alertlog === 'undefined') ? false : true;
        if(typeof console === 'undefined' || typeof console.log === 'undefined'){
            if(alertlog){
                alert(message);
            }
        }
        else {
            console.log(message);
        }
    }

})(jQuery, window);