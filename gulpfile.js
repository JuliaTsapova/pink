"use strict";

var gulp = require("gulp");
var scss = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/scss/**/*.scss", ["style"]).on("change", server.reload);
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("default", ['style', 'serve']);
