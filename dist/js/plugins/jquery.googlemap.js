/**
 *
 * Google Map
 * jquery.googlemap.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.js-map').googlemap();
 *
 * canvas                   : String. Description.
 * locations                : Array. Description.
 * apiKey                   : String. Description.
 * mapStyles                : Object. Description.
 * mapZoom                  : Boolean. Description.
 * mapDisableDefaultUI      : Boolean. Description.
 * mapStreetViewControl     : Boolean. Description.
 * mapDisableDoubleClickZoom: Boolean. Description.
 * mapScrollwheel           : Boolean. Description.
 * mapDraggable             : Boolean. Description.
 * markerAnimation          : Boolean. Description.
 * markerIcon               : String. Description.
 * markerTitle              : String. Description.
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
     * $.fn.googlemap
     * Return a unique plugin instance.
    **/
    $.fn.googlemap = function(options){
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
        // API Key
        Plugin.key = (Plugin.settings.apiKey !== '') ? '&key=' + Plugin.settings.apiKey : ''; // Must be empty string, not `null`.
        // Canvas
        Plugin.canvas = $('#' + Plugin.settings.canvas, Plugin.elem);
    }

    /**
     * Plugin.options
     * Plugin settings and options.
    **/
    Plugin.options = function(options){
        // Our application defaults.
        var defaults = {
            canvas                   : 'map-canvas',
            locations                : [],
            apiKey                   : '',
            mapStyles                : null,
            mapZoom                  : 15,
            mapDisableDefaultUI      : false,
            mapStreetViewControl     : true,
            mapDisableDoubleClickZoom: true,
            mapScrollwheel           : true,
            mapDraggable             : true,
            markerAnimation          : true,
            markerIcon               : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            markerTitle              : 'Location'
        };

        // Combine the defaults and custom Plugin.settings.
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
        // Check for canvas.
        if(!Plugin.canvas.length){Helper.log("Map canvas not available.");return;};
        // Load API.
        $.getScript('https://www.google.com/jsapi', function(){
            // Get API
            google.load('maps', '3', {
                other_params: 'sensor=false&region=GB&libraries=geometry' + Plugin.key,
                callback: Plugin.geocode_locate
            });
        });
    }

    /**
     * Plugin.geocode_locate
     * NULLED.
    **/
    Plugin.geocode_locate = function(){
        // Geocode
        var geocoder = new google.maps.Geocoder();
        // Loop.
        for(var i = 0, ii = Plugin.settings.locations.length; i < ii; i++){
            geocoder.geocode({'address' : Plugin.settings.locations[i]}, Plugin.geocode_found());
        }
    }

    /**
     * Plugin.geocode_found
     * NULLED.
    **/
    Plugin.geocode_found = function(){
        return function(results, status){
            // Check location has been found.
            if(status === google.maps.GeocoderStatus.OK){
                // Start listeners
                Plugin.load_map(results[0].geometry.location);
            }
            else{
                console.log("Can't Geolocated that location.");
            }
        }
    }

    /**
     * Plugin.load_map
     * NULLED.
    **/
    Plugin.load_map = function(location){
        // Set map canvas.
        var map = new google.maps.Map(document.getElementById(Plugin.settings.canvas), {
            mapTypeId             : google.maps.MapTypeId.ROADMAP,
            center                : location,
            zoom                  : Plugin.settings.mapZoom,
            disableDefaultUI      : Plugin.settings.mapDisableDefaultUI,
            streetViewControl     : Plugin.settings.mapStreetViewControl,
            disableDoubleClickZoom: Plugin.settings.mapDisableDoubleClickZoom,
            scrollwheel           : Plugin.settings.mapScrollwheel,
            draggable             : Plugin.settings.mapDraggable,
            styles                : Plugin.settings.mapStyles,
        });

        // Set a marker for the location.
        var marker = new google.maps.Marker({
            map      : map,
            position : location,
            animation: (Plugin.settings.markerAnimation) ? google.maps.Animation.DROP : null,
            icon     : Plugin.settings.markerIcon,
            title    : Plugin.settings.markerTitle
        });
    }

})(jQuery, window);