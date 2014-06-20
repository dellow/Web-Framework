# HTML Framework
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## About
A Gulp powered HTML Framework utilising Compass and Browserify. Also uses sprinkles of Grunt for deployment tasks until someone comes up with a decent SFTP/SSH task for Gulp.

## Install
After cloning the repository simply run `bash install` from your command line. This will do the following:

- Remove the Git wrapper and replace with a fresh Git initialisation.
- Remove any un-necessary files/directories.
- Get all Bower dependencies.
- Get all NPM dependencies, such as Grunt modules and JavaScript (You can not use Gulp or Grunt until this step is complete).
- Does an initial commit on the new Git initialisation.

You might want to review the .gitignore file. Sensitive files like `sftp-config.json` which hold SSH connection details for Grunt-SSH should be ignored, along with any other files or directories.

## Styleguide & Examples
There is a CSS styleguide in [`dist/.help/examples/styleguide.html`](dist/.help/examples/styleguide.html) which outlines some of the styled elements in the framework. You can also test the vertical rhythm [`dist/.help/examples/rhythm.html`](dist/.help/examples/rhythm.html).

These serve as ongoing platforms to test any changes you might make to framework CSS.

## Using Gulp
Run the default config in development mode:

	gulp
Run the production config production mode:

	gulp --config production
Watch for changes to the main JS and SASS files:

	gulp watch

## Watch
You can automatically compile CSS and JS on save by 'watching'. Simply run `gulp watch` to automatically compile.

__Please note:__ `watch` will run in development mode, so CSS and JS will not be minified for easier debugging. You should run `gulp --config production` to get a final minified output for your live environment.

## Working with SCSS
Any new SCSS partials should be added in the `site` directory. `base` and `config` should be left as is so they can be overwritten and updated. Use the `site/_vars` partial to override any of the default variables set in `config/_vars`.

Running Gulp in development mode with `gulp` will compile the CSS in expanded mode for easier debugging. Likewise `gulp --config production` will compile the final CSS file in nested mode.

### Debug Mode
By default debug mode is on but will only work in the default Gulp environment which is `development` mode. Adapted from [Harry Roberts' inuit.css](https://github.com/csswizardry/inuit.css), this will provide hints for potentially incorrect markup. You can override debug mode for a particular file by adding the `no-debug` class to the body.

### Dev Mode
The `site/_dev` partial is for experimental CSS that is only compiled in the default Gulp environment which is `development` mode. Any CSS in here will not compile on `gulp --config production`.

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
All custom JavaScript should be added in `app` directory - these files will be compiled by Gulp into a global build.js file.

Running Gulp in development mode with `gulp` will compile the JS without minification for easier debugging. Likewise `gulp --config production` will optimize the final build file with UglifyJS.

### Require new files
All initial files are loaded from `dist/js/app/index.js` but you can require a file from anywhere with the familiar Node requirement syntax:

	require('../app/file');

## Deployment

The Framework utilises Grunt and the Grunt-SSH task for deploying your codebase to a Unix environment. The Framework will create a `releases` directory and `current` symlink in the path you provide. Each deployment will create a new timestamped directory inside `releases` and will update the `current` symlink to point to that timestamp. Your website docroot should point to the `current` symlink.

#### How
Deploy codebase to default `live` environment:

	grunt deploy --config live

Rollback `live` codebase to previous deployment

	grunt rollback --config live

You can deploy your code from the terminal with `grunt deploy --config <site>` where `<site>` is the name of the site object in the Gruntfile.js - this is currently defaulted to `live` so `grunt deploy --config live` will deploy your code to the details set within the `live` object, you can specify more servers (staging, dev etc) if you so wish by creating new objects.

#### Environment details
You should use the `sftp-config.json` file to set the details for each environment. This means the `sftp-config.json` file can be kept safe and ignored for version control. The `sftp-config.json` file also doubles up as the SFTP config for Sublime Text and the SFTP plugin.

__Please note:__ Deployment is very much experimental and only been tested on a simple Ubuntu environment.

### Rollback
If your deployment breaks you can rollback to your last deployment with `grunt rollback --config <site>` where `<site>` is the name of the site object in the Gruntfile.js. This will remove all the files of the version you are rolling back from.

You can do concurrent rollbacks by repeating the task.