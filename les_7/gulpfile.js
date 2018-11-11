var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var minifyCSS = require('gulp-minify-css')

var buildPath = 'prod/'
var fileName = main.min;
var src = {
  html: 'app/*.html',
  less: 'app/style/*.less',
  img: ['image/*.png', 'image/*.jpeg'],
  fonts: 'app/fonts/BebasNeue/*.ttf'
};


gulp.task('css', function(){
  return gulp.src(src.less)
    .pipe(concat(fileName + '.css'))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(buildPath))
});

gulp.task('html', function(){
  return gulp.src(src.html)
    .pipe(htmlreplace({
      'css': fileName + '.css'
    }))
    .pipe(gulp.dest(buildPath))
});

gulp.task('img', function(){
  return gulp.src(src.img)
    .pipe(gulp.dest(buildPath + 'image'))
});

gulp.task('fonts', function(){
  return gulp.src(src.img)
    .pipe(gulp.dest(buildPath + 'fonts/BebasNeue'))
});

gulp.task('clean', function(){
  return gulp.src(buildPath, {read: false})
    .pipe(clean());
});

gulp.task('build', ['img','css', 'html']);
