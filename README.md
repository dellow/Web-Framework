# HTML Framework
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## About
A Grunt powered HTML Framework utilising SASS and RequireJS.

## Install
After cloning the repository simply run `bash ./clean` from your command line. This will remove the Git wrapper and replace with a fresh Git initialisation and remove any un-necessary files/directories.

You might want to review the .gitignore file. Sensitive files like `auth.json` which holds SSH connection details for Grunt-SSH should be ignored, along with any other files or directories.

## Styleguide
There is a basic CSS styleguide in [`dist/docs/styleguide.html`](dist/docs/styleguide.html).

## Using Grunt
Run the default config in development mode:

	grunt
Run the production config production mode:

	grunt production
Watch for changes to the main JS and SASS files:

	grunt watch
Deploy codebase to default `production` environment:

	grunt deploy --config production

## Watch
You can automatically compile CSS and JS on save by 'watching'. Simply run `grunt watch` to automatically compile.

__Please note:__ `watch` will run in development mode, so CSS and JS will not be minified for easier debugging. You should run `grunt production` to get a final minified output for your live environment.

## Working with SCSS
Any new SCSS partials should be added in the `site` directory. `base` and `config` should be left as is so they can be overwritten and updated. Use the `site/_vars` partial to override any of the default variables set in `config/_vars`.

Running Grunt in development mode with `grunt` will compile the CSS in expanded mode for easier debugging. Likewise `grunt production` will compile the final CSS file in nested mode.

### Debug Mode
By default debug mode is on but will only work in the default Grunt environment which is `development` mode. Adapted from [Harry Roberts' inuit.css](https://github.com/csswizardry/inuit.css), this will provide hints for potentially incorrect markup.

### Dev Mode
The `site/_dev` partial is for experimental CSS that is only compiled in the default Grunt environment which is `development` mode. Any CSS in here will not compile on `grunt production`.

### Responsive
The Framework comes with a `breakpoints` partial in both `base` and `site` these are only for global responsive changes and theoretically could be left untouched. You should use the `respond-to` mixin to create responsive styles at the bottom of the relevant partial file.

	respond-to(768px){
		.foo {
			display: block;
		}
	}

There are also various specific variables for common devices set up in `base/vars` you can use those to create breakpoints:

	respond-to($iphone5_portrait){
		.foo {
			display: block;
		}
	}

## Working with JavaScript
All custom JavaScript should be added in `app` directory - these files will be compiled by Grunt into a global build.js file.

Running Grunt in development mode with `grunt` will compile the JS without minification for easier debugging. Likewise `grunt production` will optimize the final build file with UglifyJS.

### Require new files
The Framework uses Require.js for including JS files. You can create new files in the `app` directory and require them from the primary JS file: `site.js` (or any other file) using the Require.js module loader (note the lack of file extension on the end):

	require(['app/file']);

You can also load a module and run code depending on its existence:

	require(['formValidation'], function(){
		$('.form').formValidation();
	});

## Deployment
The Framework utilises Grunt-SSH for deploying your codebase to Unix environment. Update `auth.json` with your server details (remember to add this file to .gitignore!). The Framework will create a `releases` directory and `current` symlink in the path you provide. Each deployment will create a new timestamped directory inside `releases` and will update the `current` symlink to point to that timestamp. Your website docroot should point to the `current` symlink.

You can deploy your code from the terminal with `grunt deploy --config <site>` where `<site>` is the name of the site object in the Gruntfile.js - this is currently defaulted to `production` so `grunt deploy --config production` will deploy your code to the details set within the `production` object, you can specify more servers (staging, dev etc) if you so wish by creating new objects.

__Please note:__ Deployment is very much experimental and not been tested on multiple environments.

### Rollback
If your deployment breaks you can rollback to your last deployment with `grunt rollback --config <site>` where `<site>` is the name of the site object in the Gruntfile.js. Please note this currently only works once per deploy, after rolling back you cannot concurrently rollback again until you have done another deploy.
