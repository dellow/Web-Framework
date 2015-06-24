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

    // Set helpers.
    var helpers = {};

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
     * $.fn.accordion
     * Return a unique plugin instance.
    **/
    $.fn.accordion = function(options){
        return this.each(function(){
            new Plugin(this, options).init();
        });
    };

    /**
     * $.fn.accordion.defaults
     * Default options.
    **/
    $.fn.accordion.defaults = {
        openfirst           : true,
        title_class         : 'accordion__title',
        section_class       : 'accordion__content',
        active_title_class  : 'active__title',
        active_section_class: 'active__content'
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
            _self.settings = $.extend({}, $.fn.accordion.defaults, _self.options);

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

            var title   = $('> .' + _self.settings.title_class, _self.$elem),
                content = $('> .' + _self.settings.section_class, _self.$elem);

            // Reset the accordion
            $('.' + _self.settings.active_section_class, _self.$elem).removeClass(_self.settings.active_section_class);
            $('.' + _self.settings.active_title_class, _self.$elem).removeClass(_self.settings.active_title_class);

            title.css({'cursor': 'pointer'});
            content.hide();

            if(_self.settings.openfirst){
                title.first().show().addClass(_self.settings.active_title_class);
                content.first().show().addClass(_self.settings.active_section_class);
            }

            title.on('click', function(){
                if(!$(this).hasClass(_self.settings.active_title_class)){
                    $('.' + _self.settings.active_section_class, _self.$elem).slideUp(500).removeClass(_self.settings.active_section_class);
                    $('.' + _self.settings.active_title_class, _self.$elem).removeClass(_self.settings.active_title_class);
                    $(this).addClass(_self.settings.active_title_class, _self.$elem).next().slideDown(500).addClass(_self.settings.active_section_class);
                }
            });
        }
    }

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