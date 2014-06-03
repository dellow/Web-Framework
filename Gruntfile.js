/* ================================================== */
/* Grunt
/* ================================================== */
module.exports = function(grunt){

    // Target
    var target = grunt.option('config') || 'staging';
    // Set the environment depending on the task name
    grunt.config('env', (grunt.cli.tasks == 'production') ? 'production' : 'development');
    // Set the target based on the task target
    grunt.config('target', target);

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
                base : '/',
                css  : 'dist/css',
                fonts: 'dist/css/fonts',
                img  : 'dist/images',
                js   : 'dist/js'
            },
            deploy: {
                release: (new Date()).toISOString().replace(/[^a-z0-9]/gi, '_').toLowerCase(),
                config : grunt.option('config'),
                archive: [
                    'releases/deployment.tgz'
                ],
                files  : [
                    '*htaccess',
                    '*html',
                    '*php',
                    '<%= vars.paths.css %>/addons/**',
                    '<%= vars.paths.css %>/fonts/**',
                    '<%= vars.paths.css %>/*',
                    '<%= vars.paths.img %>/**',
                    '<%= vars.paths.js %>/build/**',
                    '<%= vars.paths.js %>/plugins/**',
                    '<%= vars.paths.js %>/vendor/**'
                ]
            }
        },

        /**
         * compress
         * File compression for deployment.
        **/
        compress: {
            main: {
                options: {
                    archive: 'releases/deployment.tgz'
                },
                expand: true,
                cwd   : './',
                src   : '<%= vars.deploy.files %>'
            }
        },

        /**
         * sshexec
         * Deployment with Grunt.
        **/
        sshconfig: {
            staging: {
                host        : '',
                username    : '',
                password    : '',
                path        : '',
                readyTimeout: 99999
            },
            production: {
                host        : '<%= auth.host %>',
                username    : '<%= auth.user %>',
                password    : '<%= auth.password %>',
                //agent       : process.env.SSH_AUTH_SOCK,
                path        : '<%= auth.remote_path %>/current',
                readyTimeout: 99999
            }
        },
        sftp: {
            deploy: {
                files: {
                    './releases' : (grunt.config('target') == 'staging') ? '<%= vars.deploy.files %>' : '<%= vars.deploy.archive %>'
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
                    'sudo tar -zxvf <%= auth.remote_path %>/releases/<%= vars.deploy.release %>/releases/deployment.tgz -C <%= auth.remote_path %>/releases/<%= vars.deploy.release %>',
                    'sudo rm -rf <%= auth.remote_path %>/releases/<%= vars.deploy.release %>/releases/'
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

    // Task   : Deployment
    // Command: `grunt deploy --config <site>`
    grunt.registerTask('deploy', function(){
        if(target == 'production'){
            grunt.task.run('compress');
            grunt.task.run('sshexec:make-release');
            grunt.task.run('sshexec:do-symlinks');
        }
        grunt.task.run('sftp:deploy');
        if(target == 'production'){
            grunt.task.run('sshexec:uncompress');
            grunt.task.run('sshexec:permissions');
        }
    });

    // Task   : Rollback
    // Command: `grunt rollback --config <site>`
    grunt.registerTask('rollback', [
        'sshexec:rollback'
    ]);

}