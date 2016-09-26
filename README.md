# Web Framework Readme

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Contents
1. [About](#about)
1. [Requirements](#requirements)
1. [Install](#install)
1. [Commands](#commands)
1. [Styleguide & Examples](#styleguide-examples)
1. [Scripts](#scripts)
    1. [Assets](#scripts--assets)
    1. [Autoprefixer](#scripts--autoprefixer)
    1. [CSS](#scripts--css)
    1. [JS](#scripts--js)
    1. [Minify](#scripts--minify)
    1. [Sprite](#scripts--sprite)
    1. [Test](#scripts--test)
    1. [Watch](#scripts--watch)
1. [Testing](#testing)
1. [Working with SCSS](#working-with-scss)
    1. [Mixins](#working-with-scss--mixinss)
    1. [BEM](#working-with-scss--bem)
    1. [Responsive](#working-with-scss--responsive)
    1. [Reserved Classes](#working-with-scss--reserved-classes)
1. [Working with JavaScript](#working-with-javascript)
    1. [Requiring New Files](#working-with-javascript--requiring-new-files)
    1. [Helpers](#working-with-javascript--helpers)
1. [Changelog](#changelog)

<a name="about"></a>
## About
This is a fast Framework and/or Project Wrapper and workflow for web projects that utilises NPM and Gulp as build tools. It's also set up to work with Travis CI which will run any defined spec tests by default.

JavaScript is bundled with WebPack via NPM scripts.

CSS is compiled with SASS via Gulp (Compiling directly with NPM is to slow).

Testing is done with Jasmine for unit tests and Nightwatch for functional/integration tests.

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

<a name="requirements"></a>
## Requirements
The only system requirement is Node & NPM. All other dependencies of this Framework will be downloaded and installed when the install process is run.

- [NodeJS](http://nodejs.org/)

> __Please note:__ This should be installed before using this Framework.

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
- Get all Bower dependencies.
- Get all NPM dependencies.
- Does an initial commit on the new Git initialisation.

__All additional instructions below assume you have followed the installation process.__

> __Pro Tip:__ You can make the install script executable by running `chmod u+x install.sh`. This will allow you to run the script like this: `./install.sh`.

<a name="commands"></a>
## Commands
The framework uses NPM for most tasks although CSS is compiled via Gulp because SASS in NPM is slow. You can however still call the CSS gulp task from NPM.

All commands begin with the standard NPM scripts syntax: `npm run <scriptname>`. The current scripts are:

`assets`  
Does a one time build of both CSS and JavaScript files unminified.

`css:build`  
Does a one time build of the CSS unminified.

`css:watch`  
Watches just CSS files and builds unminified.

`js:common`  
Does a one time build of the common JavaScript files defined in `./src/dist/js/common/index.js` unminified. These are your common vendor libraries (jQuery, Underscore etc) and are kept separate so they are not built with the main app build file everytime.

`js:app`  
Does a one time build of the application JavaScript files defined in `./src/dist/js/app` unminified.

`js:all`  
Does a one time build of the application JavaScript and the common JavaScript unminified

`js:watch`  
Watches just JavaScript files and builds unminified.

`minify`  
Minifies the CSS, JavaScript and Image files.

`minify:css`  
Minifies just the CSS build file.

`minify:images`  
Minifies the image assets.

`minify:js`  
Minifies just the JavaScript build file.

`test:integration`  
Runs integration tests.

`sprite`  
Runs the sprite builder which adds all files in `./src/dist/images/icons/png` into standard and retina sprites.

`version:patch`  
Increases the version number by patch in `package.json` and `bower.json`.

`version:minor`  
Increases the version number by minor in `package.json` and `bower.json`.

`version:major`  
Increases the version number by major in `package.json` and `bower.json`.

`watch`  
Watches for changes in both CSS and JS application files and builds where necessary unminified.

<a name="styleguide-examples"></a>
## Styleguide & Examples
After installation there is a CSS styleguide located in `dist/.help/guides/styleguide.html` which outlines some of the elements in the Framework. You can also review the vertical rhythm `dist/.help/guides/rhythm.html`.

These serve as ongoing platforms to test any changes you might make to the Framework.

<a name="scripts"></a>
## Scripts
There are various singular scripts in the framework that are outlined below. There are also some scripts that run multiple sub scripts to make development easier, these are:

<a name="scripts--assets"></a>
### Assets
_Documentation coming soon_

<a name="scripts--css"></a>
### CSS
_Documentation coming soon_

<a name="scripts--js"></a>
### JS
_Documentation coming soon_

<a name="scripts--minify"></a>
### Minify
_Documentation coming soon_

<a name="scripts--sprite"></a>
### Sprite
_Documentation coming soon_

<a name="scripts--test"></a>
### Test
_Documentation coming soon_

<a name="scripts--watch"></a>
### Watch
_Documentation coming soon_

<a name="working-with-scss"></a>
## Working with SCSS
Any new SCSS partials should be added in the `site` directory. `base` and `mixins` should be left as is so they can be overwritten and updated. Use the `site/_vars` partial to override any of the default variables set in `config/_vars` and set your own mixins in the `site` directory.

<a name="working-with-scss--mixins"></a>
### SCSS Mixins
_Documentation coming soon_

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
You should use the `respond-to` mixin to create responsive styles either below the declaration you are defining like so:

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

Or if you want to target a predefined range, say 'tablet' you can using the `respond-to-range` mixin. These will use the $mobile, $tablet and $desktop vars, which you can overwrite in `vars_site.scss`.

    @include respond-to-range(tablet){
        .foo {
            display: block;
        }
    }

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

#### Namespaces
    .active-* (For elements actively displaying a part of the DOM)
    .alert (Alerts namespace)
    .bg (Backgrounds namespace)
    .btn (Buttons class namespace)
    .grid (Grid namespace)
    .js-* (JavaScript bind namespace)
    .nav-* (Navigation menu namespace)
    .page__* (Global Page class namespace)
    .sect-* (Section block namespace)
    .text-* (Text coloring)
    .u-* (Utility classes namespace)

#### WordPress Specific
    .alignleft (WordPress TinyMCE)
    .alignright (WordPress TinyMCE)
    .current_page_item (WordPress Menus)
    .current_page_parent (WordPress Menus)
    .has_sub_menu (WordPress Menus)
    .size-small (WordPress Image Sizing)
    .size-medium (WordPress Image Sizing)
    .size-large (WordPress Image Sizing)
    .wp-* (WordPress namespace)

#### Misc
    .button (Form element replication)
    .container
    .disabled (Form element replication)
    .error (Alerts: Type)
    .field (Form field wrapper)
    .input (Form element replication)
    .navigation (Navigation wrapper)
    .readonly (Form element replication)
    .status (Alerts: Type)
    .success (Alerts: Type)
    .table
    .warning (Alerts: Type)

#### Browser
    .ie6
    .ie7
    .ie8
    .oldie

#### To Be Deprecated or Namespaced
    .box
    .center
    .cite__profession
    .col
    .coupon
    .full
    .half
    .label
    .left
    .loading
    .mobile-menu
    .next
    .note
    .prev
    .qty
    .right
    .small
    .slab
    .sub-menu-active
    .v-small
    .voucher

<a name="working-with-javascript"></a>
## Working with JavaScript
The JavaScript is split into directories, some of these are for libraries / frameworks / plugins that will not be on the final server. Some are for the actual modules.

All application JavaScript modules (think: Routing, Framework Logic etc) should be added in `dist/js/app/private` directory - these files will be compiled into the global `build.js` file.

All public JavaScript modules (think: Event Listeners, Plugin binds etc) should be added in `dist/js/app/public` directory - these files will be compiled into the global `build.js` file.

The only JavaScript file that will hit the server should be at `src/dist/js/build/build.js`.

<a name="working-with-javascript--requiring-new-files"></a>
### Requiring New Files
All initial files are loaded from `dist/js/app/index.js` but thanks to Webpack you can require a file from anywhere with the familiar Node requirement syntax. There is no requirement to provide the `.js` extension:

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

***

##### throw `Helpers.throw('This is an error')`
Throws a JavaScript error.

***

##### breakpoint `Helpers.breakpoint(768)`
For easy screen size checking. Will return true if the current screen size less than the passed value.

***

##### mhi `Helpers.mhi($('.my-hidden-element'))`
Measures the height of hidden elements and returns the value. By default jQuery will return 0 if you try to measure an element set to `display: none`. __mhi__ clones the element and inserts it off screen to measure it before destroying it.

***

##### isEmpty `Helpers.isEmpty(var)`
Returns false if a variable is undefined, null, empty, has no length or falsy. Will return true otherwise.

***

##### debounce `Helpers.debounce(callback, 250)`
A simple debouncing method to help prevent constant firing of an event. Useful for on `scroll` or `resize` events.

***

##### preloader `Helpers.preloader($('.parent-element'))`
Inserts a pre-defined preloader in the given element. Can also destroy a created preloader by calling `Helpers.preloader($('.parent-element'), true);`.

***

##### ajax `Helpers.ajax('http://api/.com/endpoint/')`
A wrapper for making jQuery Ajax Promises. Will automatically add a preloader on request of data and remove it when completed.

***

##### parse_url_params `Helpers.parse_url_params('http://api/.com/endpoint/?param1=true&param2=true')`
Parses a URL for parameters and returns them in JavaScript object.

***

##### decode_entities `Helpers.decode_entities('<p>This is a string with paragraphs</p>')`
Will simply parse HTML tags from a JavaScript string.

<a name="changelog"></a>
## Changelog
See the main [Changelog](CHANGELOG.md) for entries.
