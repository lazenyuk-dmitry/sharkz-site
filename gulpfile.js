"use strict";
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    cache = require('gulp-cache'),
    flatten = require('gulp-flatten'),
    clean = require('gulp-clean'),
    del = require('del'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    changed = require('gulp-changed'),
    gulpCopy = require('gulp-copy'),
    rename  = require('gulp-rename'),
    //blocks
    pug = require('gulp-pug'),
    prettify = require('gulp-prettify'),
    //js
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    include  = require("gulp-include"),
    //img
    imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    //sass
    sass = require('gulp-sass'),
    sourcemap = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer');

var path = {
    vendor:{
        css: [
            'app/style/vendor/old-style-vendor.css'
        ],
        js: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-migrate/jquery-migrate.min.js',
            'app/js/vendor/jquery.formstyler.min.js',
            'app/js/vendor/owl.carousel.min.js',
            'app/js/vendor/autoresize.jquery.js',
            'app/js/vendor/waves.min.js'
        ]
    },
    copy: {
        input :[
            'app/fonts/**/*.*',
            'app/upload/**/*.*',
            'app/**.html',
            'app/favicon.ico'
        ],
        output: 'dist/'
    },
    //----
    app: {
        pug: 'app/*.pug',
        scss: 'app/style/*.scss',
        js: 'app/js/*.js',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    dist: {
        main: 'dist/',
        html: 'dist/',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/images',
        fonts: 'dist/fonts'
    },

    clean:{
        dist: ['dist/'],
        maps: ['dist/css/maps', 'dist/js/maps']
    },

    sourcemap: './maps',

    watch: {
        pug: [
            'app/blocks/**/*.pug',
            'app/*.pug'
            ],
        sass: [
            'app/blocks/**/*.scss',
            'app/style/**/*.scss'
        ],
        img: ['app/images/**/*.*'],
        js: [
            'app/blocks/**/*.js',
            'app/js/*.js'
        ],
        dist: ['dist/']
    }
};

//PUG convert
gulp.task('pug', function(){
    return gulp.src(path.app.pug)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "PUG ERROR"
            })}))
        .pipe(changed(path.dist.html))
        .pipe(pug({
            pretty: true
        }))
        .pipe(prettify({
            indent_size: 4
            //indent_inner_html: true,
            //unformatted: ['br', 'i', 'a']
        }))
        .pipe(gulp.dest(path.dist.html))
        .pipe(browserSync.reload({stream: true}))
});

//sass convert
gulp.task('sass', function () {
    return gulp.src(path.app.scss)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "SASS ERROR"
            })}))
        .pipe(changed(path.dist.css))
        .pipe(sourcemap.init())
        .pipe(sass({outputStyle: 'nested'})) // nested, expanded, compact, compressed
        .pipe(autoprefixer({
            browsers: ['last 20 versions', 'ie 11', 'ie > 11'],
            cascade: true
        }))
        //.pipe(rename({suffix: '.min'}))
        .pipe(sourcemap.write(path.sourcemap))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({stream: true}))
});

//common js
gulp.task('jsCommon', function() {
    return gulp.src(path.app.js)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "JS COMMON CONCAT ERROR"
            })}))
        .pipe(changed(path.dist.js))
        .pipe(sourcemap.init())
        .pipe(include())
        .pipe(uglify())
        //.pipe(rename({suffix: '.min'}))
        .pipe(sourcemap.write(path.sourcemap))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.reload({stream: true}));
});


//vendor css
gulp.task('cssVendor', function() {
    return gulp.src(path.vendor.css)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "CSS VENDOR CONCAT ERROR"
            })}))
        .pipe(changed(path.dist.css))
        .pipe(sourcemap.init({loadMaps: true}))
        .pipe(concat('vendor.min.css'))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(sourcemap.write(path.sourcemap))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({stream: true}));
});

//vendor min js
gulp.task('jsVendor', function() {
    return gulp.src(path.vendor.js)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "JS VENDOR CONCAT ERROR"
            })}))
        .pipe(changed(path.dist.js))
        .pipe(sourcemap.init())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemap.write(path.sourcemap))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.reload({stream: true}));
});

//img min
gulp.task('imgmin', function() {
    return gulp.src(path.app.img)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "IMGMIN ERROR"
            })}))
        .pipe(changed(path.dist.img))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imageminJpegRecompress({
                loops: 5,
                min: 80,
                max: 99,
                quality:'veryhigh' //low, medium, high and veryhigh.
            }),
            imagemin.svgo(),
            imagemin.optipng({optimizationLevel: 3}),
            pngquant({quality: '80-99', speed: 5})
        ],{
            verbose: true
        }))
        .pipe(gulp.dest(path.dist.img))
        .pipe(browserSync.reload({stream: true}));
});

// copy
gulp.task('copy', function() {
    return gulp.src(path.copy.input)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "COPY ERROR"
            })}))
        .pipe(changed(path.copy.output))
        .pipe(gulpCopy(path.copy.output, { prefix: 1 }))
        .pipe(browserSync.reload({stream: true}));
});

//clean
gulp.task('clean', function() {
    return del.sync(path.clean.dist); // Удаляем папку dist перед сборкой
});
gulp.task('cleanMap', function() {
    return del.sync(path.clean.maps); // Удаляем maps
});

// browser sync
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

// build
gulp.task('build', [
    'clean',
    'pug',
    'sass',
    'jsCommon',
    'cssVendor',
    'jsVendor',
    'copy',
    'imgmin'],
    function(){
        gulp.start('cleanMap');
        console.log('Build Complete !!!');
});
// watch
gulp.task('watch', [
    'browser-sync',
    'pug',
    'sass',
    'jsCommon',
    'cssVendor',
    'jsVendor',
    'copy',
    'imgmin'
    ], function(){
    watch(path.watch.pug, function(event, cb) {
        gulp.start('pug');
    });
    watch(path.watch.sass, function(event, cb) {
        gulp.start('sass');
    });
    watch(path.watch.js, function(event, cb) {
        gulp.start('jsCommon');
    });
    watch(path.vendor.css, function(event, cb) {
        gulp.start('cssVendor');
    });
    watch(path.vendor.js, function(event, cb) {
        gulp.start('jsVendor');
    });
    watch(path.copy.input, function(event, cb) {
        gulp.start('copy');
    });
    watch(path.watch.img, function(event, cb) {
        gulp.start('imgmin');
    });
});
//default
gulp.task('default',['watch']);
