/**
 *
 * Accordion
 * jquery.accordion.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.js-accordion').accordion();
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
     * $.fn.accordion
     * Return a unique plugin instance.
    **/
    $.fn.accordion = function(options){
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
            openfirst           : true,
            title_class         : 'accordion__title',
            section_class       : 'accordion__content',
            active_title_class  : 'active__title',
            active_section_class: 'active__content'
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
        var title   = $('> .' + Plugin.settings.title_class, Plugin.elem),
            content = $('> .' + Plugin.settings.section_class, Plugin.elem);

        // Reset the accordion
        $('.' + Plugin.settings.active_section_class, Plugin.elem).removeClass(Plugin.settings.active_section_class);
        $('.' + Plugin.settings.active_title_class, Plugin.elem).removeClass(Plugin.settings.active_title_class);

        title.css({'cursor': 'pointer'});
        content.hide();
        if(Plugin.settings.openfirst){
            title.first().show().addClass(Plugin.settings.active_title_class);
            content.first().show().addClass(Plugin.settings.active_section_class);
        }

        title.on('click', function(){
            if(!$(this).hasClass(Plugin.settings.active_title_class)){
                $('.' + Plugin.settings.active_section_class, Plugin.elem).slideUp(500).removeClass(Plugin.settings.active_section_class);
                $('.' + Plugin.settings.active_title_class, Plugin.elem).removeClass(Plugin.settings.active_title_class);
                $(this).addClass(Plugin.settings.active_title_class, Plugin.elem).next().slideDown(500).addClass(Plugin.settings.active_section_class);
            }
        });
    }

})(jQuery, window);