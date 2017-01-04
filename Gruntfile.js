var support = require('./support');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: {
            source: 'content',
            bower: 'bower_components',
            dist: 'dist/'
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp/{,*/}*',
                        '<%= app.dist %>/{,*/}*',
                        '!<%= app.dist %>/.git{,*/}*'
                    ]
                }]
            },
        },

        

        sass: {
            dist: {
                options: {
                    includePaths: [
                        '<%= app.source %>/styles/',
                        '<%= app.bower %>/'
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/styles',
                    src: '{,*/}*.scss',
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: { browsers: ['last 3 versions'] },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        ngAnnotate: {
            dest: {
                options: { singleQuotes: true },

                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/scripts/',
                    src: ['{,*/}*.js'],
                    dest: '.tmp/scripts/'
                }]
            }
        },

        filerev: {
            dist: {
                src: [
                    '<%= app.dist %>/{,*/}*.js',
                    '<%= app.dist %>/{,*/}*.css',
                    '<%= app.dist %>/images/{,*/}{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= app.dist %>/fonts/{,*/}*'
                ]
            }
        },

        useminPrepare: {
            html: '<%= app.source %>/index.html',

            options: {
                dest: '<%= app.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        usemin: {
            html: ['<%= app.dist %>/{,*/}*.html'],
            css:  ['<%= app.dist %>/styles/{,*/}*.css'],
            js:   ['<%= app.dist %>/scripts/{,*/}*.js'],

            options: {
                assetsDirs: [
                    '<%= app.dist %>',
                    '<%= app.dist %>/images',
                    '<%= app.dist %>/styles',
                    '<%= app.dist %>/fonts',
                    '<%= app.dist %>/views/**/*'
                ],
                patterns: {
                    js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= app.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= app.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>',
                    src: ['*.html'],
                    dest: '<%= app.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= app.source %>',
                    src: ['views/*.html'],
                    dest: '<%= app.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= app.source %>',
                    dest: '<%= app.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    src: ['**/*'],
                    dest: '<%= app.dist %>/images'
                }, {
                    expand: true,
                    cwd: '<%= app.source %>/data',
                    src: ['**/*'],
                    dest: '<%= app.dist %>/data'
                }, {
                    expand: true,
                    cwd: '<%= app.source %>',
                    src: '**/web.config',
                    dest: '<%= app.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/components-font-awesome/fonts',
                    src: '*.*',
                    dest: '<%= app.dist %>/fonts'
                }, {
                    expand: true,
                    cwd: '<%= app.source %>/views',
                    src: '**/*.*',
                    dest: '<%= app.dist %>/views'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= app.source %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [{
                        match: 'content/**/*.*',
                        options: { ignored: 'content/**/*.scss' }
                    }, {
                        match: "content/**/_*.scss",
                        fn: function (event, file) { this.reload(); },
                    }, {
                        match: 'content/**/*.scss',
                        options: { ignored: "content/**/_*.scss" },

                        fn: function (event, file) {
                            this.reload(file.slice(0, -4) + 'css');
                        },
                    }]
                },

                options: {
                    server: {
                        baseDir: ['<%= app.source %>', '<%= app.bower %>'],

                        middleware: [ support.css, support.extLess ]
                    },

                    ui: false,
                    online: true,
                    ghostMode: false,
                    notify: false
                }
            }
        }
    });

    grunt.registerTask('default', ['browserSync:dev']);

    grunt.registerTask('build', [
        'clean',
        'sass',
        'copy:styles',
        'ngAnnotate',
        'useminPrepare',
        'imagemin',
        'svgmin',
        'autoprefixer',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};
