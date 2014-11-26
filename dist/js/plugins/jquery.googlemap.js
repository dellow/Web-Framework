;(function($, window, undefined){
    'use strict';

    $.fn.googlemap = function(options){
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

        // Combine the defaults and custom settings.
        var settings = $.extend({}, defaults, options);

        // Return.
        return this.each(function(){
            var GM = GM || {};
            var _self = $(this);

            $(function(){
                GM.init();
            });

            /**
             * GM.init
             * Bind to DOM elements.
            **/
            GM.init = function(){
                // Check for canvas.
                if(!$('#' + settings.canvas, _self).length) return;
                // Load API.
                $.getScript('https://www.google.com/jsapi', function(){
                    // API Key
                    var key = (settings.apiKey !== '') ? '&key=' + settings.apiKey : ''; // Must be empty string, not `null`.
                    // Get API
                    google.load('maps', '3', {
                        other_params: 'sensor=false&region=GB&libraries=geometry' + key,
                        callback: GM.geocode_locate
                    });
                });
            }

            /**
             * GM.geocode_locate
             * NULLED.
            **/
            GM.geocode_locate = function(){
                // Geocode
                var geocoder = new google.maps.Geocoder();
                // Loop.
                for(var i = 0, ii = settings.locations.length; i < ii; i++){
                    geocoder.geocode({'address' : settings.locations[i]}, GM.geocode_found());
                }
            }

            /**
             * GM.geocode_found
             * NULLED.
            **/
            GM.geocode_found = function(){
                return function(results, status){
                    // Check location has been found.
                    if(status === google.maps.GeocoderStatus.OK){
                        // Start listeners
                        GM.load_map(results[0].geometry.location);
                    }
                    else{
                        console.log("Can't Geolocated that location.");
                    }
                }
            }

            /**
             * GM.load_map
             * NULLED.
            **/
            GM.load_map = function(location){
                // Set map canvas.
                var map = new google.maps.Map(document.getElementById(settings.canvas), {
                    mapTypeId             : google.maps.MapTypeId.ROADMAP,
                    center                : location,
                    zoom                  : settings.mapZoom,
                    disableDefaultUI      : settings.mapDisableDefaultUI,
                    streetViewControl     : settings.mapStreetViewControl,
                    disableDoubleClickZoom: settings.mapDisableDoubleClickZoom,
                    scrollwheel           : settings.mapScrollwheel,
                    draggable             : settings.mapDraggable,
                    styles                : settings.mapStyles,
                });

                // Set a marker for the location.
                var marker = new google.maps.Marker({
                    map      : map,
                    position : location,
                    animation: (settings.markerAnimation) ? google.maps.Animation.DROP : null,
                    icon     : settings.markerIcon,
                    title    : settings.markerTitle
                });
            }
        });
    }

})(jQuery, window);