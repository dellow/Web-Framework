# Web Framework Changelog

__X.X.X__:
* Fixed issue with `modify-grid` affecting nested grids when it shouldn't.
* Updated Equal Heights plugin to optionally add widths too.
* Changed the name of the App Controller to just App and made Global.
* Updated log Helper to better output objects/arrays.

__2.1.4__:
* Fixed issue with duplicate dependencies.
* Separated sprites files into specific `png` directory.
* Added new text colours utility class based on global colours array. e.g. `u-text-color-blue`.
* The `release` task now allows a version argument to specify the version number on the directory.
* Fixed issue with `this` context.

__2.1.3__:
* General fixes and improvements.
* Added better styling for form errors.

__2.1.2__:
* Moved base media objects to root of base.
* Added media object.
* Added sample module file.
* Added missing React packages.
* Added EMFILE error troubleshooting issue.
* Added an `isEmpty` helper.
* Fixed issue with Modernizr by adding via Browzernizr.
* Fixed issue with duplicate call to `build.js`.
* Made `jQuery` & `$` vars global in all methods.

__2.1.1__:
* Changed direct icon classes to not use :after pseudo class.
* Made all line-heights outputted by Knife to be unitless.
* Added jQuery ToolTipster for Tooltips.
* Moved JS call to footer again. Removing async attribute. Causes issues with GA.

__2.1.0__:
* Added missing DalekJS test files.
* Added better formatting and task descriptions in `Gulpfile.js`.
* Added responsive test example for DalekJS.
* Added SCSS objects to base.
* Fixed form styles.

__2.0.6__:
* Bug fixes and improvements.
* Added Google Analytics virtual page example in the validation callback.
* Added sub-menu ability to mobile menus.
* Added a simple hide/reveal method.
* Removed margin on sprites.
* Changed viewport to prevent zooming on mobile devices.

__2.0.5__:
* Bug fixes and improvements.

__2.0.4__:
* Changed name of JS Common and JS App tasks.
* Added Underscore to common.
* Added React to common.
* Fixed CSS sourcemaps.

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


