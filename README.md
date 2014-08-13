# Project Wrapper Workflow
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## About
This is a fast project wrapper and workflow. To use this as a full framework please follow the installation instructions below. This will pull in the [Framework Library Repo](https://github.com/sdellow/Framework-Library) using Bower which is a CSS and JS framework built using SASS and Browserify.

You will need Gulp to compile SASS and JS.

## Requirements
- [NodeJS](http://nodejs.org/)
- [Bower](http://bower.io)
- [Gulp](http://gulpjs.com)

## Install
__Please note:__ Please make sure your system meets the requirements above.

After cloning the repository simply run `bash install.sh` from your command line. This will do the following:

- Remove the Git wrapper and replace with a fresh Git initialisation.
- Remove any un-necessary files/directories.
- Get all Bower dependencies.
- Get all NPM dependencies, such as Gulp modules and JavaScript libraries (You can not use Gulp until this step is complete).
- Does an initial commit on the new Git initialisation.

__All additional instructions below assume you have followed the installation process.__

## Styleguide & Examples
There is a CSS styleguide in [`dist/.help/guides/styleguide.html`](dist/.help/guides/styleguide.html) which outlines some of the default elements in the framework. Or you can view the Elements styleguide for more specific elements [`dist/.help/guides/elements.html`](dist/.help/guides/elements.html). You can also test the vertical rhythm [`dist/.help/guides/rhythm.html`](dist/.help/guides/rhythm.html).

These serve as ongoing platforms to test any changes you might make to framework CSS.

## Using Gulp
Run the default config in development mode:

	gulp
Run the production config production mode:

	gulp --config production
Watch for changes to the main JS and SASS files:

	gulp watch

## Profiles
The Project Wrapper runs various profiles based on the environment variable. Just running `gulp` will run the `development` profile. Running any other profile requires the `--config` parameter, for example: `gulp --config production` will run the production profile. The following tasks are run for each profile:

### Development
- Browserify (Non minified)
- Compass (Non minified with development mode activated)
- CSSLint
- JSHint
- Imagemin
- Jasmine
- Bundle (No HTML or Image optimisation)

### Production
- Browserify (Minified)
- Compass (Minified)
- Bundle (HTML and Image optimisation)

## Watch
You can automatically compile CSS and JS on save by 'watching'. Simply run `gulp watch` to automatically compile.

__Please note:__ `watch` will run in development mode, so CSS and JS will not be minified for easier debugging. You should run `gulp --config production` to get a final minified output for your live environment.

## Bundle
All root commands of `gulp` will create a copy of the working `./src` directory in the `./app` directory but with just the application files. I.E. No `.scss` files or build `.js` files. This can be used as a release or for testing purposes and simply serves to automatically remove any build files for whatever use case. The corresponding profile will be applied to the `./app` directory.

## Server
You can launch the built in web server with BrowserSync simply by running `gulp serve`. This will provide a local and external address to test your apps in sync with other browsers. `gulp serve` will automatically look for changes in the following files: `.html`, `.css`, `.js` and any images in the image folder.

The `gulp serve` command takes an optional parameter to provide a proxy URL, for example: `gulp serve --url http://vagrant.dev/`. If this is supplied you files will be served through a proxy. This means you could serve a local environment such as Vagrant on a local network without any additional changes to local environment (in Vagrant's case, the .Vagrantfile). If the URL parameter is not provided, files from the `./src` directory will be served instead.

## PageSpeed
You can run Google PageSpeed insights by running `gulp pagespeed`. By default this will check `http://google.com` in `desktop` mode. You can specify a URL and mode simply by passing the relevant parameter. For example to test amazon.com simply run `gulp pagespeed --url http://amazon.com --mode desktop`.

## Release
Release creates a snapshot of the application files from the `src` directory essentially creating a release for use. Each release is timestamped and appended with the current state.

The current state will also effect the optimisation of the release. For example `gulp release` will create a release with `_development` appended to the end. The development profile (see Profiles) will be run on the release. Likewise `gulp release --config production` will run the production profile on the release.

## Working with SCSS
Any new SCSS partials should be added in the `site` directory. `base` and `config` should be left as is so they can be overwritten and updated. Use the `site/_vars` partial to override any of the default variables set in `config/_vars`.

Running Gulp in development mode with `gulp` will compile the CSS in expanded mode for easier debugging. Likewise `gulp --config production` will compile the final CSS file in nested mode.

### Debug Mode
By default debug mode is on but will only work in the default Gulp environment which is `development` mode. Adapted from [Harry Roberts' inuit.css](https://github.com/csswizardry/inuit.css), this will provide hints for potentially incorrect markup. You can override debug mode for a particular file by adding the `no-debug` class to the body.

### Dev Mode
The `site/_dev` partial is for experimental CSS that is only compiled in the default Gulp environment which is `development` mode. Any CSS in here will not compile on `gulp --config production`.

### Responsive
The Framework comes with a `breakpoints` partial in both `base` and `site` these are only for global responsive changes and theoretically could be left untouched. You should use the `respond-to` mixin to create responsive styles at the bottom of the relevant partial file.

	@include respond-to(768px){
		.foo {
			display: block;
		}
	}

There are also various specific variables for common devices set up in `base/vars` you can use those to create breakpoints:

	@include respond-to($iphone5_portrait){
		.foo {
			display: block;
		}
	}

## Working with JavaScript
All JavaScript modules should be added in `app` directory - these files will be compiled by Gulp into a global build.js file.

Running Gulp in development mode with `gulp` will compile the JS without minification for easier debugging. Likewise `gulp --config production` will optimize the final build file with UglifyJS.

### Require new files
All initial files are loaded from `dist/js/app/index.js` but thanks to Browserify you can require a file from anywhere with the familiar Node requirement syntax:

	require('../app/file');