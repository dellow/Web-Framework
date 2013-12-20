/**
 * global.js
 * Controller JS file.
**/

'use strict';

;(function($, window, undefined){
    /* -- Init -- */
    helper.init(); ui.init();

    /**
     * depTests
     * Test for dependencies. Delete this in production.
    **/
    function depTests(){
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
	depTests();

	//require(['formValidation'], function(){});
	//require(['slider'], function(){});
	//require(['lightBox'], function(){});
	//require(['scrollTo'], function(){});

}(jQuery, window));
