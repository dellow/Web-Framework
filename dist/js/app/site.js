/**
 * site.js
 * Controller JS file.
**/

;(function($, window, undefined){
    // Object
    var site = site || {};
    // Helpers
    helper.init();

    /**
     * dependency_tests
     * Test for dependencies. Delete this in production.
    **/
    site.dependency_tests = function(){
	    var depMsg = [];
	    depMsg.push((typeof $ !== undefined) ? 'jQuery is enabled.' : 'jQuery is disabled.'),
	    depMsg.push(($.fn.formValidation !== undefined) ? 'formValidation is enabled' : 'formValidation is disabled'),
	    depMsg.push(($.fn.lightBox !== undefined) ? 'lightBox is enabled' : 'lightBox is disabled'),
	    depMsg.push(($.fn.bxSlider !== undefined) ? 'bxSlider is enabled' : 'bxSlider is disabled'),
	    depMsg.push(($.fn.scrollTo !== undefined) ? 'scrollTo is enabled' : 'scrollTo is disabled');

	    for(var i = 0, ii = depMsg.length; i < ii; i++){
	    	helper.log(depMsg[i]);
	    }
	}
	site.dependency_tests();

}(jQuery, window));
