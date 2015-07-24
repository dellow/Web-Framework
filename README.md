# Web Framework

## Contents
1. [About](#about)
1. [Requirements](#requirements)
1. [Install](#install)
1. [Styleguide & Examples](#styleguide-examples)
1. [Using Gulp](#using-gulp)
1. [Profiles](#profiles)
    1. [Development](#profiles--development)
    1. [Production](#profiles--production)
1. [Watch](#watch)
1. [Sync](#sync)
1. [PageSpeed](#pagespeed)
1. [Testing](#testing)
1. [Release](#release)
1. [Working with SCSS](#working-with-scss)
    1. [Debug Mode](#working-with-scss--debug-mode)
    1. [BEM](#working-with-scss--bem)
    1. [Responsive](#working-with-scss--responsive)
    1. [Reserved Classes](#working-with-scss--reserved-classes)
1. [Working with JavaScript](#working-with-javascript)
    1. [Requiring New Files](#working-with-javascript--requiring-new-files)
    1. [Helpers](#working-with-javascript--helpers)
1. [Troubleshooting](#troubleshooting)
1. [Changelog](#changelog)

<a name="about"></a>
## About
This is a fast Framework and/or Project Wrapper and workflow for web projects  that utilises Gulp as a build tool.

<a name="requirements"></a>
## Requirements
- [NodeJS](http://nodejs.org/)
- [Bower](http://bower.io)
- [Gulp](http://gulpjs.com)
- [Bundler](http://bundler.io)

> __Please note:__ These should be installed before using this Framework.

### Gems
- [SASS 3.4.9](https://rubygems.org/gems/sass/versions/3.4.9)

> __Please note:__ Providing you have Bundler installed required Gems will automatically install for you when using the automatic installer method below.

<a name="install"></a>
## Install
_Please make sure your system meets the requirements above._

#### Bower
You can get Web Framework with bower simply by running `bower install web-framework`.

#### Git
You can get Web Framework by cloning this repository simply by running `git clone git@github.com:sdellow/web-framework.git`.

#### Init
Once complete simply run `bash install.sh` from your command line. This will do the following:

- Remove the Git wrapper and replace with a fresh Git initialisation.
- Remove any un-necessary files/directories.
- Get all Ruby Gem dependencies.
- Get all Bower dependencies.
- Get all NPM dependencies, such as Gulp modules and JavaScript libraries (You can not use Gulp until this step is complete).
- Does an initial commit on the new Git initialisation.

__All additional instructions below assume you have followed the installation process.__

> __Pro Tip:__ You can make the install script executable by running `chmod u+x install.sh`. This will allow you to run the script like this: `./install.sh`.

<a name="styleguide-examples"></a>
## Styleguide & Examples
After installation there is a CSS styleguide located in `dist/.help/guides/styleguide.html` which outlines some of the elements in the Framework. You can also test the vertical rhythm `dist/.help/guides/rhythm.html`.

These serve as ongoing platforms to test any changes you might make to the Framework.

<a name="using-gulp"></a>
## Using Gulp
Run the default profile:

    gulp
Run the development profile:

    gulp --config development
Run the production profile:

    gulp --config production
Watch for changes to the application `.js`, `.hbs` and `.scss` files:

    gulp watch
Watch for changes to the application `.js`, `.hbs` and `.scss` files and sync/reload browsers and devices:

    gulp sync

<a name="profiles"></a>
## Profiles
The Project Wrapper runs various profiles based on the environment variable. Just running `gulp` will run the `default` profile. Running any other profile requires the `--config` parameter, for example: `gulp --config production` will run the production profile. The following tasks are run for each profile:

<a name="profiles--development"></a>
### Default
- JS (Minified)
- CSS (Minified)
- Images
- Dalek
- JSHint
- Jasmine

### Development
- JS (Non minified)
- CSS (Non minified)
- Images
- Dalek
- JSHint
- Jasmine

<a name="profiles--production"></a>
### Production
- JS (Minified)
- CSS (Minified)
- Images

> __Please note:__ When run with the `production` or without the `development` argument JS and CSS tasks will run minified and the JS 'gulp_env' variable will be set to 'production'. This is by design to allow easier one time updates, without having to do a new release. In order to create an easily debuggable stylesheet and build JS file you'll need to run gulp with the `development` argument.

<a name="watch"></a>
## Watch (Using _Gulp Watch_)
You can automatically compile CSS and JS on save by 'watching'. Simply run `gulp watch` to automatically compile. For live browser reloading see [Sync](#sync).

The tasks that are run in the `watch` task are:
- JS (On .js and .hbs files under the `app` directory)
- CSS (On .scss files under the `scss` directory)

> __Please note:__ The `watch` task will minify CSS and JS if run without any arguments.

<a name="sync"></a>
## Sync (Using _BrowserSync_)
Like `watch` BrowserSync will compile `.scss`, `.js` and `.hbs` files automatically simply by running `gulp sync`. This will also provide a local and external address to test your app in sync with other browsers. `gulp sync` will automatically look for changes in `.html` and `.php` files and also the build `.css` and `.js` files and then reload all connected browsers.

The tasks that are run in the `sync` task are:
- JS (On .js and .hbs files under the `app` directory)
- CSS (On .scss files under the `scss` directory)

The `gulp sync` command takes an optional parameter to provide a proxy URL, for example: `gulp sync --url vagrant.dev` (you must supply the root domain, i.e. no sub folders). If this is supplied your files will be served through a proxy. This means you could serve a local environment such as Vagrant on a local network without any additional changes to the local environment (in Vagrant's case, the .Vagrantfile). If the URL parameter is not provided, files from the `./src` directory will be served instead.

By default `gulp sync` will also use the xip.io service for Wildcard DNS. This means you can use font services like fonts.com and typekit.com locally. You can disable xip.io by providing the `--xip=false` parameter e.g. `gulp sync --xip=false`.

> __Please note:__ The `sync` task will minify CSS and JS if run without any arguments.

<a name="pagespeed"></a>
## PageSpeed
You can run Google PageSpeed insights by running `gulp psi`. By default this will check `http://google.com` in `desktop` mode. You can specify a URL and mode simply by passing the relevant parameter. For example to test amazon.com simply run `gulp psi --url http://amazon.com --mode desktop`.

This task will also create a text file depending on the requested domain to record all PageSpeed results. E.G. A request to test `http://google.com` will create a txt file in `psi/google.com` - all subsequent requests to this domain will be appended to this file.

<a name="testing"></a>
## Testing
Client side JavaScript testing is done with Jasmine via Karma.

Browser testing is done with DalekJS.

_Documentation coming soon_

<a name="release"></a>
## Release
There is a very simple release task which simply copies all the non-build files in the `src` directory to a `release` directory. The actual release directory will be suffixed with the version number set in the Gulpfile. If you do not increment the version number each subsequent release will overwrite the last.

Files that will not be copied to the new release are:
* Any file with extension `.scss`
* Any JS files not in the `build` directory.

<a name="working-with-scss"></a>
## Working with SCSS
Any new SCSS partials should be added in the `site` directory. `base` and `mixins` should be left as is so they can be overwritten and updated. Use the `site/_vars` partial to override any of the default variables set in `config/_vars` and set your own mixins in the `site` directory.

Running Gulp in default mode with `gulp` or production mode with `gulp --config production` will compile the CSS minified. Running in development mode with `gulp --config development` will compile the the CSS un-minified for easier debugging.

<a name="working-with-scss--debug-mode"></a>
### Debug Mode
By default debug mode is on but will only work in the default Gulp environment which is `development` mode. Adapted from [Harry Roberts' inuit.css](https://github.com/csswizardry/inuit.css), this will provide hints for potentially incorrect markup. You can override debug mode for a particular file by adding the `no-debug` class to the body.

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
The Framework comes with a `breakpoints` partial in both `base` and `site` these are only for global responsive changes and theoretically could be left untouched. You should use the `respond-to` mixin to create responsive styles either below the declaration you are defining like so:

    .foo {
        display: inline-block;
    }
    // Media query after the declaration.
    @include respond-to(768px){
        .foo {
            display: block;
        }
    }

Or you can add the `respond-to` mixin within the declaration itself. For example:

    .foo {
        display: inline-block;
        // Media inside the declaration.
        @include respond-to(768px){
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

<a name="working-with-scss--reserved-classes"></a>
### Reserved Classes
The Framework does use some generic or 'loose' classes throughout. A lot of these will be filtered out in future releases as they are not specific enough and bad form. However until then this is a list of current classes you should avoid using with new elements:

    .active-*
    .alert
    .alpha (Headings)
    .beta (Headings)
    .bg
    .btn
    .box
    .button
    .center
    .col
    .container
    .coupon
    .current
    .current_page_item (WordPress Menus)
    .current_page_parent (WordPress Menus)
    .delta (Headings)
    .disabled
    .epsilon (Headings)
    .error
    .field
    .fl
    .fr
    .form-*
    .full
    .gamma (Headings)
    .grid
    .half
    .has_sub_menu (WordPress Menus)
    .hide-*
    .ie6
    .ie7
    .ie8
    .js-* (For JavaScript binds)
    .label
    .left
    .loading
    .mobile-animate
    .mobile-menu
    .navigation
    .nav-*
    .negative
    .next
    .note
    .oldie
    .opp
    .page-numbers
    .page__* (Global page var)
    .positive
    .prev
    .qty
    .readonly
    .right
    .small
    .slab
    .standard
    .status
    .sub-menu
    .success
    .table
    .u-* (Utility classes)
    .v-small
    .voucher
    .warning
    .zeta (Headings)

<a name="working-with-javascript"></a>
## Working with JavaScript
All JavaScript modules should be added in `app` directory - these files will be compiled by Gulp into a global `build.js` file.

<a name="working-with-javascript--requiring-new-files"></a>
### Requiring New Files
All initial files are loaded from `dist/js/app/index.js` but thanks to Browserify you can require a file from anywhere with the familiar Node requirement syntax. There is no requirement to provide the `.js` extension:

    require('./javascript-file');

<a name="working-with-javascript--helpers"></a>
### Helpers
The `dist/js/app/helpers/js` file contains various global helper functions to aid with development. These can be called in any JS file within the `app` directory simple by calling `Helpers.<method_name>`. The methods are described below:

##### log `Helpers.log('My console message');`
Super powered, cross-browser supported `console.log`. Will check the browser supports console logging (will use `alert` otherwise, unless overrided). All console messages will be prefixed with "DEBUG" and encapsulated into sections to easier separate messages. A simple call would result in:

    DEBUG: -----------------------------------------------
    DEBUG: My console message
    DEBUG: -----------------------------------------------

You can also supply a `type` parameter to customise the output colour (`Helpers.log('My console message', 'negative');`). By default all messages output in blue, passing `positive` will output the colour in green, while passing `negative` will output in red. Alternatively you can pass a valid HEX value instead of a positive/negative string to output in that colour.

__log__ only works in `development` mode, so you can safely leave `Helpers.log` calls in your code knowing when you compile in `production` they will not output.

***

##### breakpoint `Helpers.breakpoint(768)`
For easy screen size checking. Will return true if the current screen size less than the passed value.

***

##### mhi `Helpers.mhi($('.my-hidden-element'))`
Measures the height of hidden elements and returns the value. By default jQuery will return 0 if you try to measure an element set to `display: none`. __mhi__ clones the element and inserts it off screen to measure it before destroying it.

***

##### debounce `Helpers.debounce(callback, 250)`
A simple debouncing method to help prevent constant firing of an event. Useful for on `scroll` or `resize` events.

***

##### preloader `Helpers.preloader($('.parent-element'))`
Inserts a pre-defined preloader in the given element. Can also destroy a created preloader by calling `Helpers.preloader(true);`.

<a name="troubleshooting"></a>
## Troubleshooting
##### The `gulp sync` command with a valid `url` argument loads an empty page.
Try running with the `xip=false` argument. If this works you're router probably blocks the xip.io service (and other wildcard services). You can fix this by using an alternative DNS address. Try Google's (8.8.8.8 and 8.8.4.4). You will also need to change this on your Smartphone and/or Tablet.

#### Using font services with BrowserSync.
The gulp `sync` task uses the xip.io service by default. So to use webfont services like fonts.com and typekit.com with BrowserSync all you need to do is set `*.xip.io` as one of your allowed domains in the font service settings. Your fonts will now be available on all your devices using the URL provdided via the `sync` task.

<a name="changelog"></a>
## Changelog
__2.0.4__: 
* Changed name of JS Common and JS App tasks.
* Added Underscore to common.
* Added React to common.

__2.0.3__: 
* Lots of bug fixes and improvements.
* Install now asks for a Git repository URL.
* Removed globbing for site SCSS.
* Watch doesn't break stream on SASS error.

__2.0.2__: 
* Fixed Modernizr library.
* Helpers.log now checks if message is an array or object and outputs accordingly.
* Upgraded deprecated `css-sprite` package to `spritey`.
* Added better separation in base files.
* Consolidated form partials into one.
* Improved font sizing and spacing.
* Added new slide in mobile menu. Updated layout help file to reflect.

__2.0.1__: 
* Fixed duplicate variable issue with font-size and font-weight.
* Removed 'font_family_' prefix to font family variables.
* Normalised the line height on buttons.
* Now checks for WURFL before attempting to send dimensions.
* Required modules don't need to be manually initiated.

__2.0.0__: 
* Bugfix: PSI task created a null file if URL didn't contain a protocol.
* Merged the Project Wrapper and Project Libraries into one 'Web Framework' repository. We are now starting from version 2.0.0!
* Improve output from Notifier. Now alerted to errors and end of tasks.
* Now easier to add additional Jasmine test files.
