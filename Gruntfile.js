/**
 * Grunt Powered HTML Framework
 * http://hellostew.com
 * @author Stewart Dellow
**/

'use strict';

module.exports = function(grunt){

    /**
     * globalConfig
     * Variables.
    **/
    var globalConfig = {
        basePath   : '/',
        jsPath     : 'media/js',
        imgPath    : 'media/images',
        cssPath    : 'media/css',
        fontsPath  : 'media/css/fonts'
    };

    /**
     * grunt.initConfig
     * Grunt config.
    **/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * localConfig
         * Variables.
        **/
        localConfig: {
            jsPath: globalConfig.jsPath
        },

        /**
         * env
         * Environment.
        **/
        env: {
            options: {
            },
            dev: {
                ENV_MODE: 'development'
            },
            prod: {
                ENV_MODE: 'production'
            }
        },

        /**
         * concat
         * Concatenates JavaScript.
         * NOT CURRENTLY USED REQUIREJS DOES THIS
        **/
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    globalConfig.jsPath + '/app/site.js'
                ],
                //dest: globalConfig.jsPath + '/<%= pkg.name %>.js'
                dest: globalConfig.jsPath + '/global.js'
            }
        },

        /**
         * uglify
         * Minify JavaScripts.
         * NOT CURRENTLY USED REQUIREJS DOES THIS
        **/
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= localConfig.jsPath %>global.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        /**
         * requirejs
         * RequireJS loader and minfier.
        **/
        requirejs : {
            compile: {
                options: {
                    name          : 'build/main',
                    baseUrl       : globalConfig.jsPath,
                    mainConfigFile: globalConfig.jsPath + '/build/main.js',
                    out           : globalConfig.jsPath + '/build.js',
                    optimize      : 'uglify'
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
                    httpPath        : '/',
                    sassDir         : globalConfig.cssPath + '/scss',
                    cssDir          : globalConfig.cssPath + '',
                    imagesDir       : globalConfig.imgPath,
                    javascriptsDir  : globalConfig.jsPath + '/',
                    fontsDir        : globalConfig.fontsPath,
                    outputStyle     : 'compressed', // :expanded, :nested, :compact or :compressed
                    raw             : 'preferred_syntax = :scss\n',
                    relativeAssets  : true,
                    noLineComments  : true,
                    sourcemap       : true,
                    assetCacheBuster: false,
                    environment     : process.env.ENV_MODE
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
                    globalConfig.jsPath + '/app/**.js',
                    globalConfig.jsPath + '/build/**.js',
                    globalConfig.jsPath + '/helpers/**.js'
                ],
                tasks: ['requirejs'],
                options: {
                    livereload: true
                }
            },
            compass: {
                files: [
                    globalConfig.cssPath + '/*.scss',
                    globalConfig.cssPath + '/**/*.scss'
                ],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        }

    });

    /**
     * Load tasks
    **/
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');

    /**
     * Register tasks
    **/
    grunt.registerTask('default', ['env:dev', 'compass', 'requirejs']);
    grunt.registerTask('prod', ['env:prod', 'compass', 'requirejs']);

}
