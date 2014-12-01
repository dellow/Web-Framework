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
     * $.fn.googlemap
     * Return a unique plugin instance.
    **/
    $.fn.googlemap = function(options){
        return this.each(function(){
            new Plugin(this, options).init();
        });
    };

    /**
     * $.fn.googlemap.defaults
     * Default options.
    **/
    $.fn.googlemap.defaults = {
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

    /**
     * Plugin.prototype
     * Init.
    **/
    Plugin.prototype = {
        init: function(){
            // this
            var _self = this;

            // Global settings.
            _self.settings = $.extend({}, $.fn.googlemap.defaults, _self.options);

            // API Key
            _self.key = (_self.settings.apiKey !== '') ? '&key=' + _self.settings.apiKey : ''; // Must be empty string, not `null`.
            // Canvas
            _self.canvas = $('#' + _self.settings.canvas, _self.$elem);

            // Do jQuery event binds.
            _self.binds();
            // Run the plugin.
            _self.run();

            return _self;
        },
        binds: function(){
            var _self = this;

            // Vars
            var timeout, pointer_active = false;

            // On events
            $(document).on({
                click: function(){
                    if(!pointer_active){
                        _self.$elem.addClass('map-is-active');
                        _self.canvas.css({'pointer-events': 'auto'});
                        pointer_active = true;
                    }
                },
                mouseover: function(){
                    if(!pointer_active){
                        timeout = window.setTimeout(function(){
                            window.clearTimeout(timeout);
                            _self.$elem.addClass('map-is-active');
                            _self.canvas.css({'pointer-events': 'auto'});
                            pointer_active = true;
                        }, _self.settings.hoverThreshold);
                    }
                },
                mouseleave: function(){
                    if(pointer_active){
                        window.clearTimeout(timeout);
                        _self.$elem.removeClass('map-is-active');
                        _self.canvas.css({'pointer-events': 'none'});
                        pointer_active = false;
                    }
                }
            }, _self.selector);
        },
        run: function(){
            // Check for canvas.
            if(!this.canvas.length){Helper.log("Map canvas not available.");return;};
            // Run
            this.maps_init();
        },
        maps_init: function(){
            var _self = this;

            // Load API.
            $.getScript('https://www.google.com/jsapi', function(){
                // Get API
                google.load('maps', '3', {
                    other_params: 'sensor=false&region=GB&libraries=geometry' + _self.key,
                    callback: function(){
                        // Map Type
                        switch(_self.settings.map_type.toLowerCase()){
                            case 'roadmap' : _self.settings.map_type = google.maps.MapTypeId.ROADMAP; break;
                            case 'satellite' : _self.settings.map_type = google.maps.MapTypeId.SATELLITE; break;
                            case 'terrain' : _self.settings.map_type = google.maps.MapTypeId.TERRAIN; break;
                            case 'hybrid' : _self.settings.map_type = google.maps.MapTypeId.HYBRID; break;
                        }
                        // Start Bounds.
                        _self.bounds = new google.maps.LatLngBounds();
                        // Start Map.
                        _self.map = new google.maps.Map(document.getElementById(_self.settings.canvas), {
                            zoom                  : 5,
                            center                : new google.maps.LatLng(51.5000, 0.1167),
                            mapTypeId             : _self.settings.map_type,
                            disableDefaultUI      : _self.settings.mapDisableDefaultUI,
                            streetViewControl     : _self.settings.mapStreetViewControl,
                            disableDoubleClickZoom: _self.settings.mapDisableDoubleClickZoom,
                            scrollwheel           : _self.settings.mapScrollwheel,
                            draggable             : _self.settings.mapDraggable,
                            styles                : _self.settings.mapStyles
                        });
                        // Start Geocoder.
                        var geocoder = new google.maps.Geocoder();
                        // Loop through locations.
                        for(var i = 0, ii = _self.settings.locations.length; i < ii; i++){
                            geocoder.geocode({'address': _self.settings.locations[i]}, _self.geocode_found());
                        }

                    }
                });
            });
        },
        geocode_found: function(){
            var _self = this;

            return function(results, status){
                // Check location has been found.
                if(status === google.maps.GeocoderStatus.OK){
                    // Start listeners
                    _self.set_position(results[0].geometry.location);
                }
                else{
                    Helper.log("Can't Geolocated that location.");
                }
            }
        },
        set_position: function(location){
            var _self = this;

            // Set a marker for the location.
            var marker = new google.maps.Marker({
                map      : _self.map,
                position : location,
                animation: (_self.settings.markerAnimation) ? google.maps.Animation.DROP : null,
                icon     : _self.settings.markerIcon,
                title    : _self.settings.markerTitle
            });

            // If we have more than one location use bounds to set the viewport. Otherwise
            // set the zoom and center manually for a single location.
            if(_self.settings.locations.length > 1){
                // Extend the bounds of the map for each location.
                _self.bounds.extend(location);
                // Fit the bounds on each iteration.
                _self.map.fitBounds(_self.bounds);
            }
            else{
                _self.map.setCenter(location);
                _self.map.setZoom(_self.settings.mapZoom);
            }
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