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

    // Set plugin.
    var Plugin = {};

    /* ======================================================== */
    /* Plugin Instance
    /* ======================================================== */
    /**
     * $.fn.tabs
     * Return a unique plugin instance.
    **/
    $.fn.tabs = function(options){
        return this.each(function(){
            new Plugin.init(this, options);
        });
    };

    /* ======================================================== */
    /* Plugin base methods
    /* ======================================================== */
    /**
     * Plugin.init
     * Init this plugin.
    **/
    Plugin.init = function(elem, options){
        // Global vars.
        Plugin.elem     = $(elem);
        // Global settings.
        Plugin.settings = Plugin.options(options);
        // Expose other vars to the party.
        Plugin.vars();
        // Do binds.
        Plugin.binds();
        // Run the plugin.
        Plugin.run();
    };

    /**
     * Plugin.vars
     * Plugin variables.
    **/
    Plugin.vars = function(){
    }

    /**
     * Plugin.options
     * Plugin settings and options.
    **/
    Plugin.options = function(options){
        // Our application defaults.
        var defaults = {
            tab_class       : 'tabs__tab',
            nav_class       : 'tabs__nav',
            target_data_attr: 'tab-target',
            active_tab_class: 'active__tab'
        };

        // Combine the defaults and custom settings.
        return $.extend({}, defaults, options);
    };

    /**
     * Plugin.binds
     * jQuery bind events.
    **/
    Plugin.binds = function(){
    }

    /* ======================================================== */
    /* Plugin specific methods
    /* ======================================================== */
    // Set helper.
    var Helper = {};

    /**
     * Helper.log
     * Returns a cross-browser safe message in the console.
    **/
    Helper.log = function(message, alertlog){
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

    /**
     * plugin.run
     * Our initial function.
    **/
    Plugin.run = function(){
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

})(jQuery, window);