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
            $('.' + Plugin.settings.tab_class, Plugin.elem).hide();
            $('.' + Plugin.settings.tab_class, Plugin.elem).first().show().addClass(Plugin.settings.active_tab_class);
            $('.' + Plugin.settings.nav_class + ' li', Plugin.elem).first().addClass(Plugin.settings.active_tab_class);

            $('.' + Plugin.settings.nav_class + ' li button', Plugin.elem).on('click', function(e){
                e.preventDefault();
                var tab_nav    = $(this).parent().parent(),
                    tab_system = tab_nav.next();

                if(!$(this).parent().hasClass(Plugin.settings.active_tab_class)){
                    var target = $(this).data(Plugin.settings.target_data_attr);

                    $('li.' + Plugin.settings.active_tab_class, tab_nav).removeClass(Plugin.settings.active_tab_class);
                    $(this).parent().addClass(Plugin.settings.active_tab_class);
                    $('.' + Plugin.settings.active_tab_class, tab_system).hide().removeClass(Plugin.settings.active_tab_class);
                    $('#' + target, tab_system).fadeIn(500).addClass(Plugin.settings.active_tab_class);
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