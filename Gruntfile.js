/**
 * Grunt Powered HTML Framework
 * http://hellostew.com
 * @author Stewart Dellow
**/

'use strict';

module.exports = function(grunt){

    // Set the environment depending on the task name
    grunt.config('env', (grunt.cli.tasks == '') ? 'development' : grunt.cli.tasks);

    /**
     * grunt.initConfig
     * Grunt config.
    **/
    grunt.initConfig({
        /**
         * Load external files.
        **/
        pkg : grunt.file.readJSON('package.json'),
        auth: grunt.file.readJSON('auth.json'),

        /**
         * vars
         * Variables.
        **/
        vars: {
            global: {
                basePath : '/',
                jsPath   : 'dist/js',
                imgPath  : 'dist/images',
                cssPath  : 'dist/css',
                fontsPath: 'dist/css/fonts'
            },
            deploy: {
                releaseDir: (new Date()).toISOString(),
                config    : grunt.option('config')
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
                    name          : 'main',
                    excludeShallow: ['main'], // We don't want the main config file included in the build but we do want what it requires.
                    baseUrl       : '<%= vars.global.jsPath %>',
                    mainConfigFile: '<%= vars.global.jsPath %>/main.js',
                    out           : '<%= vars.global.jsPath %>/build/build.js',
                    optimize      : '<%= vars.requireJS.optimize %>'
                }
            }
        },

        /**
         * qunit
         * jQuery testing.
        **/
        qunit: {
            all: ['tests/**.html']
        },

        /**
         * compass
         * SASS & Compass.
        **/
        compass: {
            dist: {
                options: {
                    httpPath        : '/',
                    sassDir         : '<%= vars.global.cssPath %>/scss',
                    cssDir          : '<%= vars.global.cssPath %>',
                    imagesDir       : '<%= vars.global.imgPath %>',
                    javascriptsDir  : '<%= vars.global.jsPath %>/',
                    fontsDir        : '<%= vars.global.fontsPath %>',
                    outputStyle     : 'compressed', // :expanded, :nested, :compact or :compressed
                    raw             : 'preferred_syntax = :scss\n',
                    relativeAssets  : true,
                    noLineComments  : true,
                    //sourcemap       : true,
                    assetCacheBuster: false,
                    environment     : grunt.config('env')
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
                    '<%= vars.global.jsPath %>/*.js',
                    '<%= vars.global.jsPath %>/**/*.js',
                ],
                tasks: ['requirejs', 'qunit'],
                options: {
                    livereload: true
                }
            },
            compass: {
                files: [
                    '<%= vars.global.cssPath %>/*.scss',
                    '<%= vars.global.cssPath %>/**/*.scss'
                ],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        },

        /**
         * sshexec
         * Deployment with Grunt.
        **/
        sshconfig: {
            production: {
                // Server host
                host        : '<%= auth.host %>',
                // Server username
                username    : '<%= auth.user %>',
                // Server password
                password    : '<%= auth.pass %>',
                // SSH agent
                //agent       : process.env.SSH_AUTH_SOCK,
                // Deployment path
                path        : '<%= auth.path %>/current',
                // Port
                port        : 22,
                // Timeout
                readyTimeout: 99999
            }
        },
        sftp: {
            deploy: {
                files: {
                    './': [
                        '.htaccess',
                        '*html',
                        '*php',
                        'dist/**'
                    ]
                },
                options: {
                    showProgress        : true,
                    createDirectories   : true,
                    directoryPermissions: parseInt(755, 8)
                }
            }
        },
        sshexec: {
            'make-release': {
                command: [
                    'sudo mkdir -p <%= auth.path %>/releases/<%= vars.deploy.releaseDir %>',
                    'sudo touch <%= auth.path %>/release_list',
                    'sudo echo "<%= vars.deploy.releaseDir %>" >> <%= auth.path %>/release_list'
                ]
            },
            'do-symlinks': {
                command: [
                    'rm -rf <%= auth.path %>/current',
                    'ln -s <%= auth.path %>/releases/<%= vars.deploy.releaseDir %> <%= auth.path %>/current'
                ]
            },
            'permissions': {
                command: [
                    'sudo chown -R $USER:www-data <%= auth.path %>',
                    'sudo chmod -R 755 <%= auth.path %>'
                ]
            },
            'rollback': {
                command: [
                    'rm -rf <%= auth.path %>/current',
                    'ln -s <%= auth.path %>/releases/`tail -2 <%= auth.path %>/release_list | head -1` <%= auth.path %>/current'
                ]
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
    // Default task.
    // Command: grunt
    grunt.registerTask('default', [
        'compass',
        'requirejs',
        'qunit'
    ]);

    // Task for production.
    // Command: grunt production
    grunt.registerTask('production', [
        'compass',
        'requirejs'
    ]);

    // Task for deployment.
    // Command: grunt deploy --config <site>
    grunt.registerTask('deploy', [
        'sshexec:make-release',
        'sshexec:do-symlinks',
        'sftp:deploy',
        'sshexec:permissions',
    ]);

    // Task for rollback to previous release.
    // Command: grunt rollback --config <site>
    grunt.registerTask('rollback', [
        'sshexec:rollback'
    ]);

}