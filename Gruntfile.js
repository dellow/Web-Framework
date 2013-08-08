module.exports = function(grunt){
    'use strict';

    grunt.initConfig({

        // Metadata
        meta: {
            basePath : '/',
            jsPath   : 'lib/js',
            imgPath  : 'lib/images',
            cssPath  : 'lib/css',
            fontsPath: 'lib/css/fonts'
        },

        // Environment
        env: {
            options: {

            },
            dev: {
                NODE_ENV: 'DEVELOPMENT'
            },
            prod: {
                NODE_ENV: 'PRODUCTION'
            }
        },

        // JS Hint
        jshint: {
            all: [
                // JS File #1
                '<%= meta.jsPath %>/global.js'
                // JS File #2
                // ....
            ]
        },

        // Concat
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    // JS File #1
                    '<%= meta.jsPath %>/global.js'
                    // JS File #2
                    // ....
                ],
                dest: '<%= meta.jsPath %>/all.js'
            }
        },

        // Uglify
        uglify: {
            js: {
                files: {
                    '<%= meta.jsPath %>/all.js': ['<%= meta.jsPath %>/all.js']
                }
            }
        },

        // SASS & Compass
        compass: {
            dist: {
                options: {
                    httpPath      : '/',
                    sassDir       : '<%= meta.cssPath %>/scss',
                    cssDir        : '<%= meta.cssPath %>',
                    imagesDir     : '<%= meta.imgPath %>',
                    javascriptsDir: '<%= meta.jsPath %>/app',
                    fontsDir      : '<%= meta.fontsPath %>',
                    outputStyle   : 'compressed', // :expanded, :nested, :compact or :compressed
                    raw           : 'preferred_syntax = :scss\n',
                    relativeAssets: true,
                    noLineComments: false,
                    environment   : 'development' // :development or :production
                }
            }
        },

		// Watch
		watch: {
		    scripts: {
		        files: [
                    '<%= meta.cssPath %>/*.scss',
                    '<%= meta.cssPath %>/**/*.scss'
		        ],
		        tasks: ['compass']
		    }
		}

    });

    // Load tasks
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks
    grunt.registerTask('default', ['jshint', 'env:dev', 'compass', 'concat']);
    grunt.registerTask('prod', ['jshint', 'env:prod', 'compass', 'concat', 'uglify']);

}
