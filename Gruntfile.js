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
        jsPath     : 'dist/js',
        imgPath    : 'dist/images',
        cssPath    : 'dist/css',
        fontsPath  : 'dist/css/fonts',
        releaseDir : (new Date()).toISOString()
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
                    //sourcemap       : true,
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
                    globalConfig.jsPath + '/*.js',
                    globalConfig.jsPath + '/**/*.js',
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
        },

        /**
         * sshexec
         * Deployment with Grunt.
        **/
        auth: grunt.file.readJSON('auth.json'),
        sshconfig: {
            production: {
                host    : '<%= auth.host %>',
                username: '<%= auth.user %>',
                password: '<%= auth.pass %>',
                port    : 22,
            }
        },
        sftp: {
            deploy: {
                files: {
                    './': '/**'
                },
                options: {
                    showProgress        : true,
                    createDirectories   : false,
                    directoryPermissions: parseInt(755, 8),
                    path                : '<%= auth.path %>/releases/' + globalConfig.releaseDir
                }
            }
        },
        sshexec: {
            'make-release': {
                command: [
                    'sudo mkdir -p <%= auth.path %>/releases/' + globalConfig.releaseDir
                ]
            },
            'do-symlinks': {
                command: [
                    'rm -rf <%= auth.path %>/current',
                    'ln -s <%= auth.path %>/releases/' + globalConfig.releaseDir + ' <%= auth.path %>/current'
                ]
            },
            'permissions': {
                command: [
                    'sudo chown -R $USER:www-data <%= auth.path %>',
                    'sudo chmod -R 755 <%= auth.path %>'
                ]
            },
            options: {
                pty         : true,
                ignoreErrors: true,
                path        : '<%= auth.path %>/releases'
            }
        }

    });

    /**
     * Load tasks
    **/
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-ssh');

    /**
     * Register tasks
    **/
    // Default task
    // Command: grunt
    grunt.registerTask('default', [
        'env:development',
        'compass',
        'requirejs'
    ]);

    // Task for production
    // Command: grunt production
    grunt.registerTask('production', [
        'env:production',
        'compass',
        'requirejs'
    ]);

    // Task for deployment
    // Full deploy:
    // Command: grunt deploy --config <site>
    // Just run permissions task:
    // Command: grunt sshexec:permissions --config <site>
    // Just deploy files:
    // Command grunt sftp:deploy --config <site>
    grunt.registerTask('deploy', [
        'sshexec:make-release',
        'sftp:deploy',
        'sshexec:do-symlinks',
        'sshexec:permissions',
    ]);

}
