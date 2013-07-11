module.exports = function(grunt){

    grunt.initConfig({

        // Metadata
        meta: {
            basePath : '/',
            jsPath   : 'js/',
            imgPath  : 'images/',
            cssPath  : 'css/',
            fontsPath: 'css/fonts'
        },

        // Envionment
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
            all: ['js/site/global.js']
        },

        // Concat
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/site/global.js'],
                dest: 'js/site.js'
            }
        },

        // Uglify
        uglify: {
            js: {
                files: {
                    'js/site.js': ['js/site.js']
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
                    javascriptsDir: '<%= meta.jsPath %>/site',
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
    grunt.registerTask('default', ['jshint', 'env:dev', 'compass']);
    grunt.registerTask('prod', ['jshint', 'env:prod', 'compass', 'concat', 'uglify']);

}
