/**
 * Grunt Powered HTML Framework
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
        auth: grunt.file.readJSON('sftp-config.json'),

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
            deploy: {
                release: (new Date()).toISOString().replace(/[^a-z0-9]/gi, '_').toLowerCase(),
                config : grunt.option('config')
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
        },

        /**
         * compress
         * File compression for deployment.
        **/
        compress: {
            main: {
                options: {
                    archive: 'tmp/deployment.tgz'
                },
                expand: true,
                cwd   : './',
                src   : [
                    '*htaccess',
                    '*html',
                    '*php',
                    'dist/css/addons/**',
                    'dist/css/fonts/**',
                    'dist/css/*',
                    'dist/images/**',
                    'dist/js/build/**',
                    'dist/js/plugins/**',
                    'dist/js/vendor/**'
                ]
            }
        },

        /**
         * shell
         * Various shell commands.
        **/
        shell: {
            removeLocalTmp: {
                command: 'rm -rf tmp'
            }
        },

        /**
         * sshexec
         * Deployment with Grunt.
        **/
        sshconfig: {
            live: {
                // Server host
                host        : '<%= auth.host %>',
                // Server username
                username    : '<%= auth.user %>',
                // Server password
                password    : '<%= auth.password %>',
                // SSH agent
                //agent       : process.env.SSH_AUTH_SOCK,
                // Deployment path
                path        : '<%= auth.remote_path %>/current',
                // Port
                port        : 22,
                // Timeout
                readyTimeout: 99999
            }
        },
        sftp: {
            deploy: {
                files: {
                    './releases': [
                        'tmp/deployment.tgz',
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
                    'sudo mkdir -p <%= auth.remote_path %>/releases/<%= vars.deploy.release %>',
                    'sudo touch <%= auth.remote_path %>/release_list',
                    'sudo chown -R $USER:$USER <%= auth.remote_path %>',
                    'sudo echo "<%= vars.deploy.release %>" >> <%= auth.remote_path %>/release_list'
                ]
            },
            'uncompress': {
                command: [
                    'sudo tar -zxvf <%= auth.remote_path %>/releases/<%= vars.deploy.release %>/tmp/deployment.tgz -C <%= auth.remote_path %>/releases/<%= vars.deploy.release %>',
                    'sudo rm -rf <%= auth.remote_path %>/releases/<%= vars.deploy.release %>/tmp/'
                ]
            },
            'do-symlinks': {
                command: [
                    'sudo rm -rf <%= auth.remote_path %>/current',
                    'sudo ln -s <%= auth.remote_path %>/releases/<%= vars.deploy.release %> <%= auth.remote_path %>/current'
                ]
            },
            'permissions': {
                command: [
                    'sudo chown -R $USER:$USER <%= auth.remote_path %>',
                    'sudo chmod -R 775 <%= auth.remote_path %>'
                ]
            },
            'rollback': {
                command: [
                    'sudo rm -rf <%= auth.remote_path %>/current',
                    'sudo ln -s <%= auth.remote_path %>/releases/`tail -2 <%= auth.remote_path %>/release_list | head -1` <%= auth.remote_path %>/current',
                    'sudo rm -rf <%= auth.remote_path %>/releases/`tail -1 <%= auth.remote_path %>/release_list | head -1`',
                    'sudo sed -i "$ d" <%= auth.remote_path %>/release_list'
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
    // Task   : Default
    // Command: `grunt`
    grunt.registerTask('default', [
        'compass',
        'requirejs',
        'qunit'
    ]);

    // Task   : Production
    // Command: `grunt production`
    grunt.registerTask('production', [
        'compass',
        'requirejs'
    ]);

    // Task   : Deployment
    // Command: `grunt deploy --config <site>`
    grunt.registerTask('deploy', [
        'compress',
        'sshexec:make-release',
        'sshexec:do-symlinks',
        'sftp:deploy',
        'sshexec:uncompress',
        'sshexec:permissions',
        'shell:removeLocalTmp'
    ]);

    // Task   : Rollback
    // Command: `grunt rollback --config <site>`
    grunt.registerTask('rollback', [
        'sshexec:rollback'
    ]);

}