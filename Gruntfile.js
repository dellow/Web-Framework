/**
 * Grunt Powered HTML Framework
 * http://hellostew.com
 * @author Stewart Dellow
**/

'use strict';

module.exports = function(grunt){

    /**
     * grunt.initConfig
     * Grunt config.
    **/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * templates
         * Variables.
        **/
        templates: {
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
            }
        },

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
                    baseUrl       : '<%= templates.global.jsPath %>',
                    mainConfigFile: '<%= templates.global.jsPath %>/build/main.js',
                    out           : '<%= templates.global.jsPath %>/build.js',
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
                    sassDir         : '<%= templates.global.cssPath %>/scss',
                    cssDir          : '<%= templates.global.cssPath %>',
                    imagesDir       : '<%= templates.global.imgPath %>',
                    javascriptsDir  : '<%= templates.global.jsPath %>/',
                    fontsDir        : '<%= templates.global.fontsPath %>',
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
                    '<%= templates.global.jsPath %>/*.js',
                    '<%= templates.global.jsPath %>/**/*.js',
                ],
                tasks: ['requirejs', 'qunit'],
                options: {
                    livereload: true
                }
            },
            compass: {
                files: [
                    '<%= templates.global.cssPath %>/*.scss',
                    '<%= templates.global.cssPath %>/**/*.scss'
                ],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        },

        /**
         * auth
         * Load authorisation file.
        **/
        auth: grunt.file.readJSON('auth.json'),

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
                    'sudo mkdir -p <%= auth.path %>/releases/<%= templates.deploy.releaseDir %>',
                    'sudo touch <%= auth.path %>/release_list',
                    'sudo echo "<%= templates.deploy.releaseDir %>" >> <%= auth.path %>/release_list'
                ]
            },
            'do-symlinks': {
                command: [
                    'rm -rf <%= auth.path %>/current',
                    'ln -s <%= auth.path %>/releases/<%= templates.deploy.releaseDir %> <%= auth.path %>/current'
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