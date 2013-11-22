/**
 * global.js
 * Controller JS file.
**/

;(function($, window, undefined){
	'use strict';

    /* -- Init -- */
    helper.init(); ui.init();

	if(typeof $ !== undefined){
		helper.log('jQuery is active!');
	}

}(jQuery, window));
