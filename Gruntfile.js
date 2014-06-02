/**
 * HTML Library
 * http://hellostew.com
 * @author Stewart Dellow
**/

module.exports = function(grunt){

    // Set the environment depending on the task name
    grunt.config('env', (grunt.cli.tasks == 'production') ? 'production' : 'development');

    /**
     * grunt.initConfig
     * Grunt config.
    **/
    grunt.initConfig({
        /**
         * Load external files.
        **/
        pkg : grunt.file.readJSON('package.json'),

        /**
         * vars
         * Variables.
        **/
        vars: {
            paths: {
                basePath : '/',
                jsPath   : 'dist/js',
                imgPath  : 'dist/images',
                cssPath  : 'dist/css',
                fontsPath: 'dist/css/fonts'
            },
            compass: {
                sourcemap  : (grunt.config('env') == 'development') ? true : false,
                outputStyle: (grunt.config('env') == 'development') ? 'expanded' : 'compressed', // expanded, nested, compact or compressed
                environment: (grunt.config('env') == 'development') ? 'development' : 'production'
            },
            requireJS: {
                optimize: (grunt.config('env') == 'development') ? 'none' : 'uglify'
            }
        },

        /**
         * requirejs
         * RequireJS loader and minfier.
        **/
        requirejs : {
            compile: {
                options: {
                    baseUrl       : '',
                    name          : '<%= vars.paths.jsPath %>/main',
                    excludeShallow: ['<%= vars.paths.jsPath %>/main'], // We don't want the main config file included in the build but we do want what it requires.
                    out           : '<%= vars.paths.jsPath %>/build/build.js',
                    optimize      : '<%= vars.requireJS.optimize %>',
                    wrap: {
                        start: '"use strict"\ ;\n'
                    },
                    paths: {
                        // Libraries
                        angular       : 'node_modules/angular/lib/angular.min',
                        backbone      : 'node_modules/backbone/backbone',
                        jquery        : 'node_modules/jquery/dist/jquery',
                        jqueryui      : 'node_modules/jquery-ui/jquery-ui',
                        // RequireJS Modules
                        req_async     : '<%= vars.paths.jsPath %>/vendor/require/require.async',
                        // Plugins
                        extensions    : '<%= vars.paths.jsPath %>/plugins/jquery.extensions',
                        validation    : '<%= vars.paths.jsPath %>/plugins/jquery.validation',
                        lightBox      : '<%= vars.paths.jsPath %>/plugins/jquery.lightBox',
                        scrollto      : '<%= vars.paths.jsPath %>/plugins/jquery.scrollto.min',
                        slider        : '<%= vars.paths.jsPath %>/plugins/jquery.bxslider.min',
                        // Local
                        helper        : '<%= vars.paths.jsPath %>/helpers/helper',
                        // App
                        site          : '<%= vars.paths.jsPath %>/app/site'
                    },
                    shim: {
                        extensions: {
                            deps: ['jquery']
                        },
                        validation: {
                            deps: ['jquery']
                        },
                        lightBox: {
                            deps: ['jquery']
                        },
                        scrollto: {
                            deps: ['jquery']
                        },
                        slider: {
                            deps: ['jquery']
                        },
                        site: {
                            deps: ['helper', 'extensions']
                        }
                    }
                }
            }
        },

        /**
         * compass
         * SASS & Compass.
        **/
        compass: {
            dist: {
                options: {
                    app             : 'stand_alone',
                    httpPath        : '/',
                    importPath      : [],
                    sassDir         : '<%= vars.paths.cssPath %>/scss',
                    cssDir          : '<%= vars.paths.cssPath %>',
                    imagesDir       : '<%= vars.paths.imgPath %>',
                    javascriptsDir  : '<%= vars.paths.jsPath %>/',
                    fontsDir        : '<%= vars.paths.fontsPath %>',
                    outputStyle     : '<%= vars.compass.outputStyle %>',
                    environment     : '<%= vars.compass.environment %>',
                    //sourcemap       : '<%= vars.compass.sourcemap %>',
                    raw             : 'preferred_syntax = :scss\n',
                    force           : true,
                    relativeAssets  : true,
                    noLineComments  : true,
                    assetCacheBuster: false
                }
            }
        },

        /**
         * watch
         * Watch for changes to specific files.
        **/
        watch: {
            scripts: {
                files: [
                    '<%= vars.paths.jsPath %>/*.js',
                    '<%= vars.paths.jsPath %>/**/*.js',
                ],
                tasks: [
                    'requirejs'
                ],
                options: {
                    livereload: true
                }
            },
            compass: {
                files: [
                    '<%= vars.paths.cssPath %>/*.scss',
                    '<%= vars.paths.cssPath %>/**/*.scss'
                ],
                tasks: [
                    'compass'
                ],
                options: {
                    livereload: true
                }
            }
        }

    });

    /**
     * Load tasks using matchdep.
    **/
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * Register tasks.
    **/
    // Task   : Default
    // Command: `grunt`
    grunt.registerTask('default', [
        'compass',
        'requirejs'
    ]);

    // Task   : Production
    // Command: `grunt production`
    grunt.registerTask('production', [
        'compass',
        'requirejs'
    ]);

}