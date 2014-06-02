/**
 * forms.js
 * Forms JS file.
**/

;(function($, window, undefined){
    // Object
    var forms = forms || {};

	// Form validation
	require(['validation'], function(){
        // General forms
        if($('.validate').length){
            $('.validate').validation({
                preloaderSize: 20,
                preloaderHEX : '#FFFFFF',
                msgSep       : ''
            });
        }
	});

}(jQuery, window));