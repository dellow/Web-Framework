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

    // Require :: NPM
    require('fancybox');
    // Require :: Plugins
    require('../plugins/jquery.equal-heights');
    require('../plugins/jquery.googlemap');
    require('../plugins/jquery.modals');
    require('../plugins/jquery.validation');
    // Require :: Vendor
    require('../plugins/vendor/jquery.slider');

    /**
     * Module.init
     * Init method for this module.
    **/
    Module.init = function(){
    }

    /**
     * Module.equal_heights
     * Equal height elements.
    **/
    Module.equal_heights = function(){
        // DOM check.
        if(!$('.js-eh').length){return};
        // Init plugin.
        $('.js-eh').equalHeights();
    }

    /**
     * Module.google_map
     * Map events.
    **/
    Module.google_map = function(){
        // DOM check.
        if(!$('.js-google-map').length){return};
        // Init plugin.
        $('.js-google-map').googlemap({
            locations: [
                'United Kingdom'
            ]
        });
    }

    /**
     * Module.lightboxes
     * Lightbox events.
    **/
    Module.lightboxes = function(){
        // DOM check.
        if(!$('.js-lightbox').length){return};
        // Init plugin.
        $('.js-lightbox').fancybox({
            autoWidth    : true,
            autoHeight   : true,
            autoScale    : true,
            transitionIn : 'fade'
        });
    }

    /**
     * Module.modals
     * Modal events.
    **/
    Module.modals = function(){
        // DOM check.
        if(!$('.js-modal').length){return};
        // Init plugin.
        $('.js-modal').modal();
        // Init plugin on load (or function call).
        // $(window).modal({
        //     type   : 'modal-slide-left',
        //     content: 'Some content here.'
        // });
        // // Destroy created modal.
        // $(window).destroyModal();
    }

    /**
     * Module.sliders
     * Slider events.
    **/
    Module.sliders = function(){
        // DOM check.
        if(!$('.js-slider').length){return};
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
    }

    /**
     * Module.validation
     * Form validation events.
    **/
    Module.validation = function(){
        // DOM check.
        if(!$('.js-validate').length){return};
        // Init plugin.
        $('.js-validate').validation({
            serverValidation        : false,
            appendErrorToPlaceholder: true
        });
    }

    // Export
    module.exports = Binds;

}(window.Binds = window.Binds || {}, jQuery, window));
