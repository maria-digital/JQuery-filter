var gulp = require('gulp'),
	rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
	clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
	svgmin = require('gulp-svgmin'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	pug = require('gulp-pug'),
    less = require('gulp-less'),
    path = require('path');


gulp.task('scripts', function () {
    gulp.src('src/js/shuffle.js')
        .pipe(concat('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest('build/images'))
});

gulp.task('svg', function () {
    return gulp.src('src/images/icons/*')
        .pipe(svgmin())
        .pipe(gulp.dest('build/icons'));
});

gulp.task('clean', function () {
  return gulp.src('build/', {read: false, allowEmpty: true})
    .pipe(clean());
});


gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: './build/',
            index: 'index.html'
        },
        port: 3000,
        host: 'localhost',
        logPrefix: 'frontend',
        open: true
    });
});

gulp.task('templates', function buildHTML() {
    return gulp.src('src/templates/pages/index.pug')
        .pipe(pug({
            pretty: true 
        }).on('error', function(error) {
            console.log(error);
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/less/*.less', gulp.series('less'));
    gulp.watch('src/templates/**/*.pug', gulp.series('templates'));
    gulp.watch('src/*.images', gulp.series('images'));
    gulp.watch('src/images/*.svg', gulp.series('svg'));
});


gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'images', 'svg', 'less', 'templates', 'browser-sync')));



