/**
 * Created by Mothra on 10/26/15.
 */
//dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
//create *.js.map file
var sourcemaps = require('gulp-sourcemaps');
//slam multiple *.js files together
var concat = require('gulp-concat');
//shrink code to be smaller for compy
var uglify = require('gulp-uglify');
var uglifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');

gulp.task('dev', ['process-js',
        'process-css',
        'process-jade',
        'process-images'
        ],
    function(){
        gutil.log('Gulped!');
    });


gulp.task('default', ['dev'], function(){
    watch('./client/**/*', function(){
        gulp.start('dev');
    });
});

gulp.task('process-js', function(){
    return gulp.src('./client/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('process-css', function(){
    return gulp.src('./client/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(uglifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('process-jade', function(){
    return gulp.src('./client/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./public'))
});

gulp.task('process-images', function(){
    return gulp.src('./client/images/*.jpg')
        .pipe(gulp.dest('./public/images'))
});
