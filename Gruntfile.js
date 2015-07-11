module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        copy: {
            files: {
                cwd: 'app/',  // set working folder / root to copy
                src: ['**/*'],           // copy all files and subfolders
                dest: 'dist/',    // destination folder
                expand: true           // required when using cwd
            },
            jquery: {
                cwd:'bower_components/jquery/dist/',
                src: ['jquery.js'],
                dest: 'dist/scripts/',
                expand: true
            },
            bs_css:{
                cwd:'bower_components/bootstrap/dist/css',
                    src: ['bootstrap.css'],
                dest: 'dist/styles/',
                expand: true
            },
            bs_js: {
                cwd:'bower_components/bootstrap/dist/js',
                    src: ['bootstrap.js'],
                dest: 'dist/scripts/',
                expand: true
            },
            bs_fonts: {
                cwd:'bower_components/bootstrap/dist/fonts',
                src: ['**/*'],
                dest: 'dist/fonts/',
                expand: true
            },
            fa_css: {
                cwd:'bower_components/fontawesome/css',
                src: ['font-awesome.css'],
                dest: 'dist/fonts/',
                expand: true
            },
            fa_css: {
                cwd:'bower_components/fontawesome/fonts',
                src: ['**/*'],
                dest: 'dist/fonts/',
                expand: true
            }
        },
        clean: {
            dist: ["dist/*"]
        },
        sync: {
            main: {
                files: [{
                    cwd: 'app/',
                    src: [
                        '**', /* Include everything */
                        '!**/*.txt' /* but exclude txt files */
                    ],
                    dest: 'dist'
                }],
                pretend: true, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
                verbose: true // Display log messages when copying files
            }
        },
        concat: {
            js: {
                src: ['dist/scripts/jquery.js','dist/scripts/bootstrap.js','dist/scripts/main.js'],
                dest: 'dist/scripts/script.concat.js'
            },
            css: {
                src: 'dist/styles/*.css',
                dest: 'dist/styles/style.concat.css'
            }
        },
        uglify: {
            js: {
                src: 'dist/scripts/script.concat.js',
                dest: 'dist/scripts/script.min.js'
            }
        },
        cssmin: {
            css:{
                src: 'dist/styles/style.concat.css',
                dest: 'dist/styles/style.min.css'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true
            },
            globals: {
                exports: true,
                module: false
            }
        },
        processhtml: {
            options: {
                data: {
                    message: 'Hello world!'
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['app/index.html']
                }
            }
        },
        watch: {
            scripts: {
                files: ['scripts/*.js'],
                tasks: ['sync','concat:js', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['styles/*.css'],
                tasks: ['sync','concat:css','cssmin'],
                options: {
                    spawn: false
                }
            },
            html:{
                files: ['app/**/*.html'],
                tasks: ['sync','processhtml'],
                options: {
                    spawn: false
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask('default', ['clean','copy','concat','uglify', 'cssmin','processhtml']);

};