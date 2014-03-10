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

## Deployment
The framework utilises Grunt-SSH for deploying your codebase. Update `auth.json` with your server details (remember to add this file to .gitignore!). The framework will create a `releases` directory and `current` symlink in the path you provide. Each deployment will create a new timestamped directory inside `releases` and will update the `current` symlink to point to that timestamp. Your website docroot should point to the `current` symlink.

You can deploy your code from the terminal with `grunt deploy --config <site>` where `<site>` is the name of the site object in the Gruntfile.js - this is currently defaulted to `production` so `grunt deploy --config production` will deploy your code to the details set within the `production` object, you can specify more servers (staging, dev etc) if you so wish by creating new objects.

## Working with SCSS
Any new SCSS partials should be added in the `site` directory. `base` and `config` should be left as is so they can be overwritten and updated. Use the `site/_vars` partial to override any of the default variables set in `config/_vars`.

### Debug Mode
By default debug mode is off. Adapted from [Harry Roberts' inuit.css](https://github.com/csswizardry/inuit.css), this will provide hints for potentially incorrect markup. You can enable this by declaring `$debug_mode = true` in `site/vars`.

### Responsive
The framework comes with a `breakpoints` partial in both `base` and `site` these are only for global responsive changes and theoretically could be left untouched. You should use the `respond-to` mixin to create responsive styles at the bottom of the relevant partial file.

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

### Require new files
The framework uses Require.js for including JS files. You can create new files in the `app` directory and require them from the primary JS file: `site.js` (or any other file) using the Require.js module loader (note the lack of file extension on the end):

	require(['path/to/file']);

You can also perform various functions on if a file has been loaded:

	require(['formValidation'], function(){
		$('.form').formValidation();
	})
