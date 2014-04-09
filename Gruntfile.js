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
         * env
         * Environment.
        **/
        env: {
            options: {
            },
            development: {
                ENV_MODE: 'development'
            },
            production: {
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
                    'sudo mkdir -p <%= auth.path %>/releases/' + globalConfig.releaseDir,
                    'sudo touch <%= auth.path %>/release_list',
                    'sudo echo "' + globalConfig.releaseDir + '" >> <%= auth.path %>/release_list'
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
            'rollback': {
                command: [
                    'rm -rf <%= auth.path %>/current',
                    'ln -s <%= auth.path %>/releases/`tail -2 <%= auth.path %>/release_list | head -1` <%= auth.path %>/current'
                ]
            }
        }

    });

    /**
     * Load tasks
    **/
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
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
        'requirejs',
        'qunit'
    ]);

    // Task for production
    // Command: grunt production
    grunt.registerTask('production', [
        'env:production',
        'compass',
        'requirejs'
    ]);

    // Task for deployment
    // Command: grunt deploy --config <site>
    grunt.registerTask('deploy', [
        'sshexec:make-release',
        'sshexec:do-symlinks',
        'sftp:deploy',
        'sshexec:permissions',
    ]);

    // Task for rollback to previous release
    // Command: grunt rollback --config <site>
    grunt.registerTask('rollback', [
        'sshexec:rollback'
    ]);

}