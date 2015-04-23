# Project Wrapper & Workflow

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
9. [PageSpeed (Extended)](#pagespeed)
10. [Working with SCSS](#working-with-scss)
	1. [Debug Mode](#working-with-scss--debug-mode)
	2. [Dev Mode](#working-with-scss--dev-mode)
	3. [BEM](#working-with-scss--bem)
	4. [Responsive](#working-with-scss--responsive)
11. [Working with JavaScript](#working-with-javascript)
	1. [Requiring New Files](#working-with-javascript--requiring-new-files)

<a name="about"></a>
## About
This is a fast project wrapper and workflow that utilises Gulp. To use this as a full Framework please follow the installation instructions below. This will pull in the [Framework Library Repo](https://github.com/sdellow/Framework-Library) using Bower which is a CSS and JS Framework built using SASS and Browserify.

### Extended Modules
This wrapper has been split into a 'normal' and 'extended' version. The extended version includes other modules and tasks such as Dalek, JSHint and Jasmine. You will need to rename the `package.json.extended` file to just `package.json` (overwriting the current one) and the `gulp.extended` directory to use the extended version.

Any part of this readme that requires the extended modules will be suffixed with '(Extended)'.

<a name="requirements"></a>
## Requirements
- [NodeJS](http://nodejs.org/)
- [Bower](http://bower.io)
- [Gulp](http://gulpjs.com)
- [Bundler](http://bundler.io)

### Gems
- [SASS 3.4.9](https://rubygems.org/gems/sass/versions/3.4.9)
- [Compass 1.0.1](https://rubygems.org/gems/compass/versions/1.0.1)

> __Please note:__ Required Gems will automatically install for you when using the automatic installer method below.

<a name="install"></a>
## Install
> __Please note:__ Please make sure your system meets the requirements above.

After cloning the repository simply run `bash install.sh` from your command line. This will do the following:

- Remove the Git wrapper and replace with a fresh Git initialisation.
- Remove any un-necessary files/directories.
- Get all Ruby Gem dependencies.
- Get all Bower dependencies.
- Get all NPM dependencies, such as Gulp modules and JavaScript libraries (You can not use Gulp until this step is complete).
- Does an initial commit on the new Git initialisation.

__All additional instructions below assume you have followed the installation process.__

> __Hint:__ You can make the install script executable by running `chmod u+x install.sh`. This will allow you to run the script like this: `./install.sh`.

<a name="styleguide-examples"></a>
## Styleguide & Examples
After installation there is a CSS styleguide located in `dist/.help/guides/styleguide.html` which outlines some of the elements in the Framework. You can also test the vertical rhythm `dist/.help/guides/rhythm.html`.

These serve as ongoing platforms to test any changes you might make to the Framework.

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
- Imagemin
- Dalek (Extended)
- JSHint (Extended)
- Jasmine (Extended)

<a name="profiles--production"></a>
### Production
- Browserify (Minified)
- Compass (Minified)
- Imagemin

> __Please note:__ When run with the `production` or without the `development` argument Browserify and Compass will run minified. This is by design to allow easier one time updates, without having to do a new release. In order to create an easily debuggable stylesheet and build JS file you'll need to run gulp with the `development` argument.

<a name="watch"></a>
## Watch
You can automatically compile CSS and JS on save by 'watching'. Simply run `gulp watch` to automatically compile. For live browser reloading see [Server](#server).

The tasks that are run in the `watch` task are:
- Browserify (On .js and .hbs files)
- Compass (On .scss files)

> __Please note:__ `watch` will minify CSS and JS.

<a name="server"></a>
## Server
You can launch the built in web server with BrowserSync simply by running `gulp server`. This will provide a local and external address to test your apps in sync with other browsers. `gulp server` will automatically look for changes in the following files: `.html`, `.php`, `.css`, `.js`, any images in the image folder and run the respective tasks on them.

The tasks that are run in the `server` task are:
- Browserify (On .js and .hbs files)
- Compass (On .scss files)

The `gulp server` command takes an optional parameter to provide a proxy URL, for example: `gulp server --url http://vagrant.dev/` (you must supply the root domain, i.e. no sub folders). If this is supplied you files will be served through a proxy. This means you could serve a local environment such as Vagrant on a local network without any additional changes to local environment (in Vagrant's case, the .Vagrantfile). If the URL parameter is not provided, files from the `./src` directory will be served instead.

> __Please note:__ `server` will minify CSS and JS.

<a name="pagespeed"></a>
## PageSpeed (Extended)
You can run Google PageSpeed insights by running `gulp psi`. By default this will check `http://google.com` in `desktop` mode. You can specify a URL and mode simply by passing the relevant parameter. For example to test amazon.com simply run `gulp psi --url http://amazon.com --mode desktop`.

This task will also create a text file depending on the requested domain to record all PageSpeed results. E.G. A request to test `http://google.com` will create a txt file in `logs/pagespeed/google.com` - all subsequent requests to this domain will be appended to this file.

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

<a name="working-with-scss--bem"></a>
### BEM Syntax
Much of the Framework CSS is based around the BEM syntax. The virtues of BEM are out of the scope of this guide, please see [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) and [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) for all the information you need to get started on BEM.

You don't __have__ to use BEM. But it is recommended. Since Version 3.3, SASS includes native methods for writing CSS in BEM. Please see the following example:

_Syntax_:

	.block {
	    &__element {
	    }
	    &--modifier {
	    }
	}

_Will compile to_:

	.block {
	}
	.block__element {
	}
	.block--modifier {
	}

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

The `respond-to` mixin converts all values to `em` (see: [The EMs have it: Proportional Media Queries FTW!](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/)) and can take various arguments to create breakpoints for you.

You can use the above examples to create a simple query or specify two breakpoints to create a `min-width / max-width` query:

_Syntax_:

	@include respond-to(320px, 768px){
		.foo {
			display: block;
		}
	}

_Will compile to_:

	@media only screen and (min-width: 20em) and (max-width: 48em){
		.foo {
			display: block;
		}
	}

The above example will create a media query for styles between 320px and 768px. For more information and advanced use please see the `_responsive.scss` partial in the mixins directory.

By default the Framework is set to a Desktop First approach. This can (and probably should) be changed in the `_vars.scss` partial simply by setting: `$mobile_first: true` - This will use `min-width` by default in the `respond-to` mixin otherwise it will use `max-width` by default. This can be overrode with each call to the mixin if the `$switch_operator` argument is passed `true`:

	@include respond-to(320px, null, true){
		.foo {
			display: block;
		}
	}

<a name="working-with-javascript"></a>
## Working with JavaScript
All JavaScript modules should be added in `app` directory - these files will be compiled by Gulp into a global `build.js` file.

<a name="working-with-javascript--requiring-new-files"></a>
### Requiring New Files
All initial files are loaded from `dist/js/app/index.js` but thanks to Browserify you can require a file from anywhere with the familiar Node requirement syntax. There is no requirement to provide the `.js` extension:

	require('./javascript-file');
