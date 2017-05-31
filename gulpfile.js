var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("src/main/typescript/tsconfig.json");
var tsProject2015 = ts.createProject("src/main/typescript/tsconfig-es15.json");
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");

var gulp = require('gulp');
var Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.config.js',
        singleRun: true
    }, done).start();
});


gulp.task("ts", function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(rename(function (path) {
            path.basename += "-umd";
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});
gulp.task("ts15", function () {
    return tsProject2015.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject2015())
        .pipe(rename(function (path) {
            path.basename += "-es2015";
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});

// Basic usage
gulp.task('bundle', ["ts"], function() {
    // Single entry point to browserify
    gulp.src('dist/Monad-umd.js')
        .pipe(sourcemaps.init())
        .pipe(browserify({
            insertGlobals : true//,
            //debug : !gulp.env.production
        }))
        .pipe(rename(function (path) {
            path.basename += "-bundle";
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist'))

});

gulp.task('default',["bundle", "ts15"]);