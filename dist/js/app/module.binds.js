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
    **/
    Module = function(){
        // Require :: NPM
        require('fancybox');
        // Require :: Plugins
        require('../plugins/jquery.equal-heights');
        require('../plugins/jquery.googlemap');
        require('../plugins/jquery.modals');
        require('../plugins/jquery.validation');
        // Require :: Vendor
        require('../plugins/vendor/jquery.slider');
    }

    /**
     * init
     * Init method for this module.
    **/
    Module.prototype.init = function(){
        // Document ready.
        $(function(){
            // Call methods here.
        });
        // Window ready (images loaded).
        $(window).on('load', function(){
            // Call methods here.
        });
    }

    /**
     * equal_heights
     * Equal height elements.
    **/
    Module.prototype.equal_heights = function(){
        // DOM check.
        if(!$('.js-eh').length){
            // Init plugin.
            $('.js-eh').equalHeights();
        };
    }

    /**
     * google_map
     * Map events.
    **/
    Module.prototype.google_map = function(){
        // DOM check.
        if(!$('.js-google-map').length){
            // Init plugin.
            $('.js-google-map').googlemap({
                locations: [
                    'United Kingdom'
                ]
            });
        };
    }

    /**
     * lightboxes
     * Lightbox events.
    **/
    Module.prototype.lightboxes = function(){
        // DOM check.
        if(!$('.js-lightbox').length){
            // Init plugin.
            $('.js-lightbox').fancybox({
                autoWidth    : true,
                autoHeight   : true,
                autoScale    : true,
                transitionIn : 'fade'
            });
        };
    }

    /**
     * modals
     * Modal events.
    **/
    Module.prototype.modals = function(){
        // DOM check.
        if(!$('.js-modal').length){
            // Init plugin.
            $('.js-modal').modal();
            // Init plugin on load (or function call).
            $(window).modal({
                type   : 'modal-slide-left',
                content: 'Some content here.'
            });
            // // Destroy created modal.
            $(window).destroyModal();
        };
    }

    /**
     * sliders
     * Slider events.
    **/
    Module.prototype.sliders = function(){
        // DOM check.
        if($('.js-slider').length){
            // Init plugin.
            $('.js-slider').bxSlider({
                auto        : true,
                controls    : true,
                pager       : false,
                autoReload  : true,
                infiniteLoop: true,
                moveSlides  : 1,
                breaks      : [
                    {screen: 0, slides: 1, pager: false},
                    {screen: 460, slides: 2},
                    {screen: 768, slides: 3}
                ]
            });
        };
    }

    /**
     * validation
     * Form validation events.
    **/
    Module.prototype.validation = function(){
        // Check captcha.
        if($('#c_a_p_t_c_h_a').length){
            $('#c_a_p_t_c_h_a').prop('checked', true);
        }

        // DOM check.
        if($('.js-validate').length){
            // Init plugin.
            $('.js-validate').validation({
                serverValidation        : false,
                appendErrorToPlaceholder: true
            });
        };
    }

    // Export
    module.exports = Module;

}(window.Binds = window.Binds || function(){}, jQuery, window));
