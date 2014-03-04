var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var server = require('./server');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var runSequence = require('gulp-run-sequence');


var distFolder = 'dist';

gutil.log('Environment', gutil.colors.blue(gulp.env.production ? 'Production' : 'Development'));

var filesToMove = ['./src/fonts/**'];

gulp.task('clean', function () {
    return gulp.src(['./' + distFolder + '/**'], {
        read: false
    }).pipe(clean());
});

gulp.task('fonts', function () {
    return gulp.src(['./src/fonts/**']).pipe(gulp.dest(distFolder + '/css/fonts/'));
});

gulp.task('scripts', function () {
    return gulp.src('./src/js/main.js', {
        read: false
    }).pipe(browserify({
        // insertGlobals: true,
        transform: ['jstify'],
        shim: {
            'jquery.flot': {
                path: './src/js/vendor/Flot/jquery.flot.js',
                exports: null,
                depends: {
                    jquery: 'jQuery'
                }
            },
            'jquery.flot.resize': {
                path: './src/js/vendor/Flot/jquery.flot.resize.js',
                exports: null,
                depends: {
                    jquery: 'jQuery'
                }
            },

            'jquery.event.drag': {
                path: './src/js/vendor/jquery.event.drag-2.2/jquery.event.drag-2.2.js',
                exports: null,
                depends: {
                    jquery: 'jQuery'
                }
            },
            'jquery.event.drop': {
                path: './src/js/vendor/jquery.event.drop-2.2/jquery.event.drop-2.2.js',
                exports: null,
                depends: {
                    jquery: 'jQuery'
                }
            },
            'jquery.gridster': {
                path: './src/js/vendor/gridster/dist/jquery.gridster.js',
                exports: null,
                depends: {
                    jquery: 'jQuery'
                }


            }

        },
        debug: !gulp.env.production
    })).pipe(gulp.dest('./' + distFolder + '/js'));
});

gulp.task('styles', function () {
    return gulp.src('./src/scss/styles.scss')
        .pipe(compass({
            config_file: './config.rb',
            sass: './src/scss',
            css: './dist/css'
        }))
        .pipe(gulp.dest('./' + distFolder + '/css'));
});

gulp.task('default', ['build'], function () {
    var servers = server(3000, 35729);

    gulp.watch('./src/js/**', function (evt) {
        gulp.run('scripts', function () {
            servers.lr.changed({
                body: {
                    files: ['dist/js/main.js']
                }
            });
        });
    });

    gulp.watch('./src/scss/**', function (evt) {
        gulp.run('styles', function () {
            servers.lr.changed({
                body: {
                    files: ['dist/css/styles.css']
                }
            });
        });
    });

});

gulp.task('build', function (cb) {
    runSequence('clean', ['fonts', 'styles', 'scripts'], cb);
});
