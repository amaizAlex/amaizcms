import gulp from "gulp";
import {spawn} from "child_process";
import hugoBin from "hugo-bin";
import gutil from "gulp-util";
import flatten from "gulp-flatten";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

import plumber from "gulp-plumber";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-minify-css";
import assetVersion from "gulp-asset-version";

import rigger from "gulp-rigger";
import uglify from "gulp-uglify";

import clean from "gulp-clean";

import sequence from "gulp-sequence";

import critical from "critical";




const browserSync = BrowserSync.create();

// Hugo arguments
const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

// Development tasks
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, hugoArgsPreview));


// Run server tasks
gulp.task('server', function(cb) {
    sequence("clean", "hugo", "css", "js", "fonts", "img", function() { runServer(cb) });
});

gulp.task('server-preview', function(cb) {
    sequence("clean", "hugo-preview", "css", "js", "fonts", "img", function() { runServer(cb) });
});


// Build/production tasks
gulp.task('build-before', function(cb) {
    sequence("clean", "css", "js", "fonts", "img", function() { buildSite(cb, [], "production") })
});
gulp.task('build-preview-before', function(cb) {
    sequence("clean", "css", "js", "fonts", "img", function() { buildSite(cb, hugoArgsPreview, "production") });
});

gulp.task('build', sequence("build-before", "critical"));
gulp.task('build-preview', sequence("build-preview-before", "critical"));

// CRITICAL CSS
gulp.task('critical', function(){
  return gulp.src(['!./dist/admin/index.html', './dist/**/*.html' ])
    .pipe(plumber())
    .pipe(critical.stream({
      base: './dist',
      inline: true,
    }))
    .pipe(plumber())
    .pipe(gulp.dest('./dist'))
});


// CSS build
gulp.task('css', function(){
  gulp.src('./src/css/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(assetVersion())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
});


// JS build
gulp.task('js', ["jquery"], function(){
  gulp.src('./src/js/main.js')
    .pipe(plumber())
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream())
});

// Move jquery
gulp.task('jquery', () => (
  gulp.src("./src/js/jquery.js")
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream())
));


// Move all fonts in a flattened directory
gulp.task('fonts', () => (
  gulp.src("./src/fonts/**/*")
    .pipe(flatten())
    .pipe(gulp.dest("./dist/fonts"))
    .pipe(browserSync.stream())
));

// Move all img in a flattened directory
gulp.task('img', () => (
  gulp.src("./src/img/**/*.*")
    .pipe(gulp.dest("./dist/img"))
    .pipe(browserSync.stream())
));


gulp.task('clean', function () {
    return gulp.src(['!./dist/lp', './dist/*'], {read: false})
        .pipe(clean());
});

// Development server with browsersync
function runServer() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./src/fonts/**/*", ["fonts"]);
  gulp.watch("./site/**/*", ["hugo"]);
};

/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = environment;

  return spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
