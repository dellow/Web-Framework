# Project Wrapper & Workflow
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## Contents
1. [About](#about)
2. [Requirements](#requirements)
3. [Install](#install)
4. [Styleguide & Examples](#styleguide-examples)
5. [Using Gulp](#using-gulp)
6. [Profiles](#profiles)
	1. [Development](#profiles--development)
	2. [Production](#profiles--production)
7. [Watch](#watch)
8. [Server](#server)
9. [PageSpeed](#pagespeed)
10. [Release](#release)
11. [Working with SCSS](#working-with-scss)
	1. [Debug Mode](#working-with-scss--debug-mode)
	2. [Dev Mode](#working-with-scss--dev-mode)
	3. [Responsive](#working-with-scss--responsive)
12. [Working with JavaScript](#working-with-javascript)
	1. [Requiring New Files](#working-with-javascript--requiring-new-files)

<a name="about"></a>
## About
This is a fast project wrapper and workflow that utilises Gulp. To use this as a full framework please follow the installation instructions below. This will pull in the [Framework Library Repo](https://github.com/sdellow/Framework-Library) using Bower which is a CSS and JS framework built using SASS and Browserify.

<a name="requirements"></a>
## Requirements
- [NodeJS](http://nodejs.org/)
- [Bower](http://bower.io)
- [Gulp](http://gulpjs.com)

### Gems
- [Compass 1.0.0.alpha.21](https://rubygems.org/gems/compass/versions/1.0.0.alpha.21)

<a name="install"></a>
## Install
> __Please note:__ Please make sure your system meets the requirements above.

After cloning the repository simply run `bash install.sh` from your command line. This will do the following:

- Remove the Git wrapper and replace with a fresh Git initialisation.
- Remove any un-necessary files/directories.
- Get all Bower dependencies.
- Get all NPM dependencies, such as Gulp modules and JavaScript libraries (You can not use Gulp until this step is complete).
- Does an initial commit on the new Git initialisation.

__All additional instructions below assume you have followed the installation process.__

<a name="styleguide-examples"></a>
## Styleguide & Examples
There is a CSS styleguide in [`dist/.help/guides/styleguide.html`](dist/.help/guides/styleguide.html) which outlines some of the elements in the framework. You can also test the vertical rhythm [`dist/.help/guides/rhythm.html`](dist/.help/guides/rhythm.html).

These serve as ongoing platforms to test any changes you might make to framework CSS.

<a name="using-gulp"></a>
## Using Gulp
Run the default profile in development mode:

	gulp
Run the production profile production mode:

	gulp --config production
Watch for changes to the main JS and SASS files:

	gulp watch

<a name="profiles"></a>
## Profiles
The Project Wrapper runs various profiles based on the environment variable. Just running `gulp` will run the `development` profile. Running any other profile requires the `--config` parameter, for example: `gulp --config production` will run the production profile. The following tasks are run for each profile:

<a name="profiles--development"></a>
### Development
- Browserify (Non minified)
- Compass (Non minified with development mode activated)
- Dalek
- JSHint
- Jasmine

<a name="profiles--production"></a>
### Production
- Browserify (Minified)
- Compass (Minified)

<a name="watch"></a>
## Watch
You can automatically compile CSS and JS on save by 'watching'. Simply run `gulp watch` to automatically compile.

> __Please note:__ `watch` will run in development mode, so CSS and JS will not be minified for easier debugging. You should run `gulp --config production` to get a final minified output for your live environment.

<a name="release"></a>
## Release
Release creates a snapshot of the application files from the `src` directory essentially creating a release for use. Each release is timestamped and appended with the current state.

### Current
Additionally a folder called `current` will be created inside the `release` directory. This is a consistently named directory for the latest release and is useful if you use an online deploy tool such as DeployHQ or dploy.io as you can set this directory as the root directory to deploy from whereas individual releases will be timestamped with no consistent name.

### Profile
The current profile will also effect the optimisation of the release. For example `gulp release` will create a release with `_development` appended to the end. The development profile (see [Profiles](#profiles)) will be run on the release. Likewise `gulp release --config production` will run the production profile on the release.

<a name="server"></a>
## Server
You can launch the built in web server with BrowserSync simply by running `gulp serve`. This will provide a local and external address to test your apps in sync with other browsers. `gulp serve` will automatically look for changes in the following files: `.html`, `.php`, `.css`, `.js` and any images in the image folder.

The `gulp serve` command takes an optional parameter to provide a proxy URL, for example: `gulp serve --url http://vagrant.dev/` (you must supply the root domain, i.e. no sub folders). If this is supplied you files will be served through a proxy. This means you could serve a local environment such as Vagrant on a local network without any additional changes to local environment (in Vagrant's case, the .Vagrantfile). If the URL parameter is not provided, files from the `./src` directory will be served instead.

<a name="pagespeed"></a>
## PageSpeed
You can run Google PageSpeed insights by running `gulp pagespeed`. By default this will check `http://google.com` in `desktop` mode. You can specify a URL and mode simply by passing the relevant parameter. For example to test amazon.com simply run `gulp pagespeed --url http://amazon.com --mode desktop`.

<a name="working-with-scss"></a>
## Working with SCSS
Any new SCSS partials should be added in the `site` directory. `base` and `config` should be left as is so they can be overwritten and updated. Use the `site/_vars` partial to override any of the default variables set in `config/_vars`.

Running Gulp in development mode with `gulp` will compile the CSS in expanded mode for easier debugging. Likewise `gulp --config production` will compile the final CSS file in nested mode.

<a name="working-with-scss--debug-mode"></a>
### Debug Mode
By default debug mode is on but will only work in the default Gulp environment which is `development` mode. Adapted from [Harry Roberts' inuit.css](https://github.com/csswizardry/inuit.css), this will provide hints for potentially incorrect markup. You can override debug mode for a particular file by adding the `no-debug` class to the body.

<a name="working-with-scss--dev-mode"></a>
### Dev Mode
The `site/_dev` partial is for experimental CSS that is only compiled in the default Gulp environment which is `development` mode. Any CSS in here will not compile on `gulp --config production`.

<a name="working-with-scss--responsive"></a>
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

<a name="working-with-javascript"></a>
## Working with JavaScript
All JavaScript modules should be added in `app` directory - these files will be compiled by Gulp into a global `build.js` file.

Running Gulp in development mode with `gulp` will compile the JS without minification for easier debugging. Likewise `gulp --config production` will optimize the final build file with UglifyJS.

<a name="working-with-javascript--requiring-new-files"></a>
### Requiring New Files
All initial files are loaded from `dist/js/app/index.js` but thanks to Browserify you can require a file from anywhere with the familiar Node requirement syntax. There is no requirement to provide the `.js` extension:

	require('./javascript-file');