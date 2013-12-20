/**
 * Displays a google map
 *
 * @todo: https://developers.google.com/maps/documentation/javascript/overlays
 * @todo: Custom labels
 * @todo: Custom controls
 * @todo: Custom styling (https://developers.google.com/maps/documentation/javascript/styling)
 * @todo: Circles, Rectangles and Polgons
 * @todo: Streetview stuff (https://developers.google.com/maps/documentation/javascript/reference#StreetViewService)
 * @todo: Strings and Titles are not outputted correctly
**/

var googlemap = {
    init: function(){
        // Convert string to lowercase
        googlemap.maptype = maptype.toLowerCase();

        // Set the map type
        switch(googlemap.maptype){
            case 'roadmap':
                googlemap.map_type_setting = google.maps.MapTypeId.ROADMAP;
            break;
            case 'satellite':
                googlemap.map_type_setting = google.maps.MapTypeId.SATELLITE;
            break;
            case 'hybrid':
                googlemap.map_type_setting = google.maps.MapTypeId.HYBRID;
            break;
            case 'terrain':
                googlemap.map_type_setting = google.maps.MapTypeId.TERRAIN;
            break;
            default:
                googlemap.map_type_setting = google.maps.MapTypeId.ROADMAP;
            break;
        }

        // Create an empty array for our Geocoded results
        googlemap.georesults = [];

        googlemap.defaultMap();

    },
    defaultMap: function(){
        // API Settings
        googlemap.settings = {
            mapTypeId             : googlemap.map_type_setting,
            zoom                  : (zoom !== '') ? zoom : 10,
            disableDefaultUI      : (controls) ? false : true,
            streetViewControl     : (streetview) ? true : false,
            disableDoubleClickZoom: (doubleclick) ? true : false,
            scrollwheel           : (scroll) ? true : false,
            draggable             : (draggable) ? true : false,
            center                : new google.maps.LatLng(0, 0)
        };

        // Init the Map Canvas
        googlemap.map      = new google.maps.Map(document.getElementById('map_canvas'), googlemap.settings);
        // Init the bounds
        googlemap.bounds   = new google.maps.LatLngBounds();
        // Init the GeoCoder
        googlemap.geocoder = new google.maps.Geocoder();
        // Init the streetview service
        googlemap.service  = new google.maps.StreetViewService();

        // Custom map style
        if(typeof(styles) !== 'undefined'){
            googlemap.styled_map = {
                map : googlemap.map,
                name: 'google_map'
            }
            googlemap.restyled_map = new google.maps.StyledMapType(styles, googlemap.styled_map);
            googlemap.map.mapTypes.set('google_map', googlemap.restyled_map);
            googlemap.map.setMapTypeId('google_map');
        }

        // Cycle through our locations
        for(var i = 0; i < locations.places.length; i++){
            googlemap.geocoder.geocode({'address' : locations.places[i]}, googlemap.located(i));
        }
    },
    located: function(){
        // Callback for the GeoCoder - gets round the asynchronous issue.
        return function(results, status){
            if(status === google.maps.GeocoderStatus.OK){

                googlemap.georesults.push(results[0].geometry.location);

                if(googlemap.georesults.length === locations.places.length){
                    for(var i = 0; i < googlemap.georesults.length; i++){
                        if(!animatebounds){
                            // Extend the bounds of the map for each location
                            googlemap.bounds.extend(googlemap.georesults[i]);
                            // Fit the bounds on each iteration
                            googlemap.map.fitBounds(googlemap.bounds);
                        }
                        if(googlemap.georesults.length <= 1){
                            googlemap.map.setZoom(zoom);
                        }
                        setTimeout(function(){
                            addMarker(i);
                        }, i * 750);
                    }
                    var marker;
                    var k = 0;

                    function addMarker(){
                        var marker = new google.maps.Marker({
                            position : googlemap.georesults[k],
                            map      : googlemap.map,
                            icon     : (locations.markers[k] !== '') ? locations.markers[k] : '',
                            shadow   : (locations.markers[k] !== '' && locations.shadows[k] !== '') ? locations.shadows[k] : '',
                            title    : locations.location_title[k],
                            animation: google.maps.Animation.DROP
                        });

                        if(animatebounds){
                            // Extend the bounds of the map for each location
                            googlemap.bounds.extend(googlemap.georesults[k]);
                            // Fit the bounds on each iteration
                            googlemap.map.fitBounds(googlemap.bounds);
                        }

                        // Set the content of the infoWindow
                        var infoWindow = new google.maps.InfoWindow({
                            content: '<p>' + locations.strings[k] + '</p>',
                            maxWidth: 200
                        });

                        // Marker click event
                        google.maps.event.addListener(marker, 'click', function(){
                            infoWindow.close();
                            animate_bounce();
                            infoWindow.open(googlemap.map, this);
                        });
                        google.maps.event.addListener(infoWindow, 'closeclick', function(){
                            marker.setAnimation(null);
                        });

                        function animate_bounce(action){
                            if(marker.getAnimation() != null){
                                marker.setAnimation(null);
                            }
                            else{
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                                setTimeout(function(){ marker.setAnimation(null); }, 2900);
                            }
                        }
                        k++;
                    }
                }
                else{
                    alert("Sorry can't find that location!");
                }
            }
        }
    }
}

google.maps.event.addDomListener(window, "load", googlemap.init());
