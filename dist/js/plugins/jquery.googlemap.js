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
 * canvas                   : String. The ID applied to the actual element used for the map canvas.
 * locations                : Array. An array of locations to show on the map.
 * apiKey                   : String. Optional. Google console API key to monitor usage.
 * hoverThreshold           : String. Threshold when hovering before map events are available.
 * mapStyles                : Object. See http://goo.gl/uuaJqF for more information on styling maps.
 * mapZoom                  : Boolean. Default Zoom level when only one location is set.
 * mapDisableDefaultUI      : Boolean. Disable the UI controls.
 * mapStreetViewControl     : Boolean. Disable the street view man.
 * mapDisableDoubleClickZoom: Boolean. Prevent double clicking the canvas from zooming in.
 * mapScrollwheel           : Boolean. Prevent scrolling the map with the mouse wheel.
 * mapDraggable             : Boolean. Prevent click dragging the map.
 * markerAnimation          : Boolean. Allow markers to magically drop from the sky.
 * markerIcon               : String. A custom icon for the markers.
 * markerTitle              : String. A title for the markers.
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
        // Cache the selector.
        Plugin.selector = this.selector;

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
            map_type                 : 'roadmap',
            hoverThreshold           : 500,
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
        // Vars
        var timeout, pointer_active = false;

        // On events
        $(document).on({
            click: function(){
                if(!pointer_active){
                    Plugin.elem.addClass('map-is-active');
                    Plugin.canvas.css({'pointer-events': 'auto'});
                    pointer_active = true;
                }
            },
            mouseover: function(){
                if(!pointer_active){
                    timeout = window.setTimeout(function(){
                        window.clearTimeout(timeout);
                        Plugin.elem.addClass('map-is-active');
                        Plugin.canvas.css({'pointer-events': 'auto'});
                        pointer_active = true;
                    }, Plugin.settings.hoverThreshold);
                }
            },
            mouseleave: function(){
                if(pointer_active){
                    window.clearTimeout(timeout);
                    Plugin.elem.removeClass('map-is-active');
                    Plugin.canvas.css({'pointer-events': 'none'});
                    pointer_active = false;
                }
            }
        }, Plugin.selector);
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
                callback: Plugin.maps_init
            });
        });
    }

    /**
     * Plugin.maps_init
     * Initialise the map canvas and Geocode locations.
    **/
    Plugin.maps_init = function(){
        // Map Type
        switch(Plugin.settings.map_type.toLowerCase()){
            case 'roadmap' : Plugin.settings.map_type = google.maps.MapTypeId.ROADMAP; break;
            case 'satellite' : Plugin.settings.map_type = google.maps.MapTypeId.SATELLITE; break;
            case 'terrain' : Plugin.settings.map_type = google.maps.MapTypeId.TERRAIN; break;
            case 'hybrid' : Plugin.settings.map_type = google.maps.MapTypeId.HYBRID; break;
        }
        // Start Bounds.
        Plugin.bounds = new google.maps.LatLngBounds();
        // Start Map.
        Plugin.map = new google.maps.Map(document.getElementById(Plugin.settings.canvas), {
            zoom                  : 5,
            center                : new google.maps.LatLng(51.5000, 0.1167),
            mapTypeId             : Plugin.settings.map_type,
            disableDefaultUI      : Plugin.settings.mapDisableDefaultUI,
            streetViewControl     : Plugin.settings.mapStreetViewControl,
            disableDoubleClickZoom: Plugin.settings.mapDisableDoubleClickZoom,
            scrollwheel           : Plugin.settings.mapScrollwheel,
            draggable             : Plugin.settings.mapDraggable,
            styles                : Plugin.settings.mapStyles
        });
        // Start Geocoder.
        var geocoder = new google.maps.Geocoder();
        // Loop through locations.
        for(var i = 0, ii = Plugin.settings.locations.length; i < ii; i++){
            geocoder.geocode({'address': Plugin.settings.locations[i]}, Plugin.geocode_found());
        }
    }

    /**
     * Plugin.geocode_found
     * Geocoder callback.
    **/
    Plugin.geocode_found = function(){
        return function(results, status){
            // Check location has been found.
            if(status === google.maps.GeocoderStatus.OK){
                // Start listeners
                Plugin.set_position(results[0].geometry.location);
            }
            else{
                Helper.log("Can't Geolocated that location.");
            }
        }
    }

    /**
     * Plugin.set_position
     * Set's the map position and places a marker.
    **/
    Plugin.set_position = function(location){
        // Set a marker for the location.
        var marker = new google.maps.Marker({
            map      : Plugin.map,
            position : location,
            animation: (Plugin.settings.markerAnimation) ? google.maps.Animation.DROP : null,
            icon     : Plugin.settings.markerIcon,
            title    : Plugin.settings.markerTitle
        });

        // If we have more than one location use bounds to set the viewport. Otherwise
        // set the zoom and center manually for a single location.
        if(Plugin.settings.locations.length > 1){
            // Extend the bounds of the map for each location.
            Plugin.bounds.extend(location);
            // Fit the bounds on each iteration.
            Plugin.map.fitBounds(Plugin.bounds);
        }
        else{
            Plugin.map.setCenter(location);
            Plugin.map.setZoom(Plugin.settings.mapZoom);
        }
    }

})(jQuery, window);