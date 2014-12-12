/**
 *
 * Module
 *
 * Copyright 2014, Author Name
 * Some information on the license.
 *
**/

// Require
require('../plugins/jquery.equal-heights');
require('../plugins/jquery.lightbox');
require('../plugins/jquery.slider');
require('../plugins/jquery.validation');

;(function(Module, $, window, undefined){
    'use strict';

    /**
     * Module.init
     * Init method for this module.
    **/
    Module.init = function(){
        Module.equal_heights();
        Module.lightboxes();
        Module.sliders();
        Module.validation();
    }

    /**
     * Module.equal_heights
     * Equal height elements.
    **/
    Module.equal_heights = function(){
        if($('.js-eh').length){
            $('.js-eh').equalHeights();
        }
    }

    /**
     * Module.lightboxes
     * Lightbox events.
    **/
    Module.lightboxes = function(){
        if($('.js-lightbox').length){
            $('.js-lightbox').fancybox({
                autoWidth    : true,
                autoHeight   : true,
                autoScale    : true,
                transitionIn : 'fade'
            });
        }
    }

    /**
     * Module.sliders
     * Slider events.
    **/
    Module.sliders = function(){
        if($('.js-slider').length){
            $('.js-slider').bxSlider({
                auto        : false,
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
    }

    /**
     * Module.validation
     * Form validation events.
    **/
    Module.validation = function(){
        if($('.js-validate').length){
            $('.js-validate').validation({
                serverValidation: false,
                msgSep          : ''
            });
        }
    }

    // Export
    module.exports = Binds;

}(window.Binds = window.Binds || {}, jQuery, window));