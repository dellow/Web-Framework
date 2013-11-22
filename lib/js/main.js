/**
 * main.js
 * Main JS file. Loads modules with RequireJS.
**/

'use strict';

require.config({
    baseUrl: 'lib/js/',
    paths: {
		// Libraries
		jquery        : [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
			'libs/jquery.1.10.2.min'
		],
		jqueryui      : [
			'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
			'libs/jquery-ui.1.10.3.min'
		],
		angularjs     : [
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min',
			'libs/angularjs.1.0.8.min'
		],
		knockout      : 'libs/knockout-2.3.0.min',
		backbone      : 'libs/backbone.min',
		underscore    : 'libs/underscore.min',
		respond       : 'libs/respond.min',
		retina        : 'libs/retina.min',
    	// Local
		helper        : 'app/helper',
		ui            : 'app/ui',
		// Functions
		global        : 'global',
		// RequireJS Modules
		req_async     : 'libs/require/require.async',
		// Plugins
		extensions    : 'plugins/jquery.extensions.min',
		formValidation: 'plugins/jquery.form-validation.min',
		lightBox      : 'plugins/jquery.lightBox.min',
		scrollto      : 'plugins/jquery.scrollto.min',
		slider        : 'plugins/jquery.bxslider.min'
    },
    shim: {
    	ui            : {
    		deps: ['jquery']
    	},
    	helper        : {
    		// No dependencies
    	},
    	extensions    : {
    		deps: ['jquery']
    	},
    	formValidation: {
    		deps: ['jquery']
    	},
    	lightBox      : {
    		deps: ['jquery']
    	},
    	scrollto      : {
    		deps: ['jquery']
    	},
    	slider        : {
    		deps: ['jquery']
    	},

    	// Setup global
    	global: {
			deps: ['helper', 'ui', 'extensions', 'formValidation', 'lightBox', 'scrollto', 'slider']
    	}
    }
});

require(['global']);
