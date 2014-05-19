/**
 * forms.js
 * Forms JS file.
**/

;(function($, window, undefined){
    // Object
    var forms = forms || {};

	// Form validation
	require(['formValidation'], function(){
        // General forms
        if($('.validate').length){
            $('.validate').formValidation({
                // No options
            });
        }
	});

}(jQuery, window));