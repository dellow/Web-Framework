/**
 * main.js
 * Main JS file. Loads modules with RequireJS.
**/

'use strict';

require.config({
    paths: {
		// Libraries
        angular       : '../../node_modules/angular/lib/angular.min',
        backbone      : '../../node_modules/backbone/backbone',
		jquery        : '../../node_modules/jquery/dist/jquery',
		jqueryui      : '../../node_modules/jquery-ui/jquery-ui',
		// RequireJS Modules
		req_async     : 'vendor/require/require.async',
		// Plugins
		extensions    : 'plugins/jquery.extensions',
		formValidation: 'plugins/jquery.form-validation',
		lightBox      : 'plugins/jquery.lightBox',
		scrollto      : 'plugins/jquery.scrollto.min',
		slider        : 'plugins/jquery.bxslider.min',
    	// Local
		helper        : 'helpers/helper',
		ui            : 'helpers/ui',
		// Functions
		site          : 'app/site'
    },
    shim: {
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
