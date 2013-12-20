/**
 * main.js
 * Main JS file. Loads modules with RequireJS.
**/

'use strict';

require.config({
    baseURL: 'lib/js/',
    paths: {
		// Libraries
		jquery        : 'vendor/jquery.1.10.2.min',
		jqueryui      : 'vendor/jquery-ui.1.10.3.min',
		angularjs     : 'vendor/angularjs.1.0.8.min',
		knockout      : 'vendor/knockout-2.3.0.min',
		backbone      : 'vendor/backbone.min',
		underscore    : 'vendor/underscore.min',
		respond       : 'vendor/respond.min',
		retina        : 'vendor/retina.min',
		// RequireJS Modules
		req_async     : 'vendor/require/require.async',
		// Plugins
		extensions    : 'plugins/jquery.extensions.min',
		formValidation: 'plugins/jquery.form-validation.min',
		lightBox      : 'plugins/jquery.lightBox.min',
		scrollto      : 'plugins/jquery.scrollto.min',
		slider        : 'plugins/jquery.bxslider.min',
    	// Local
		helper        : 'helpers/helper',
		ui            : 'helpers/ui',
		// Functions
		site          : 'app/site'
    },
    shim: {
    	helper        : {
    		// No dependencies
    	},
    	ui            : {
    		deps: ['jquery']
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

    	// Setup site
    	site: {
			deps: ['helper', 'ui', 'extensions']
    	}
    }
});

require(['site']);
