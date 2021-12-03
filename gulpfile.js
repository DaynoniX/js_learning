'use strict'

const { gulp, watch, task, src, series, dest} = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass')(require('sass')),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    browsersync = require("browser-sync"),
    reload = browsersync.reload;

const path = {
    build: {
        html: 'app/build/',
        js: 'app/build/js/',
        css: 'app/build/css/',
        img: 'app/build/assets/',
    },
    src: {
        html: 'app/src/html/*.html',
        js: 'app/src/js/**/*.js',
        style: 'app/src/styles/*.scss',
        img: 'app/src/assets/**/*.*'
    },
    watch: {
        html: 'app/src/html/**/*.html',
        js: 'app/src/js/**/*.js',
        style: 'app/src/styles/*.scss',
        img: 'app/src/assets/**/*.*'
    },
    clean: './app/build'
};
const config = {
    server: {
        baseDir: "./app/build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "js_learning"
}

function browserSync(done){
    browsersync.create().init(config)
    done();
}
function clean(){
    return rimraf(path.clean)
}
function createStyle(done){
    src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefix())
        .pipe(dest(path.build.css))
        .pipe(reload({stream: true}));
    done()
}
function createTemplate(done){
     src(path.src.html)
         .pipe(rigger())
         .pipe(dest(path.build.html))
         .pipe(reload({stream: true}));
    done()
}
function createJs(done){
    src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(dest(path.build.js))
        .pipe(reload({stream: true}));
    done()
}

function watchFiles(){
    watch(path.watch.html, createTemplate);
    watch(path.watch.style, createStyle);
    watch(path.watch.js, createJs);
 }

exports.build = series( createTemplate,createStyle,createJs);
 exports.default = series( createTemplate,createStyle,createJs, browserSync, watchFiles);
