/**
 * images.js
 * Images JS file.
**/

;(function($, window, undefined){
    // Object
    var images = images || {};

	// Lightbox
	require(['lightBox'], function(){
        // General Lightbox
        if($('.lightbox').length){
            $('.lightbox').lightBox({
                // No options
            });
        }
	});

}(jQuery, window));