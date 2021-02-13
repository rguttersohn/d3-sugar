const {dest, src} = require('gulp')
const uglify = require('gulp-uglify')
const strip = require('gulp-strip-debug')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const terser = require('gulp-terser')


function minify (cb){
   return src('d3-sugar.js')
    .pipe(terser())
    .pipe(strip())
    .pipe(rename({extname:'.min.js'}))
    .pipe(dest('dist'))
    cb()
}

exports.min = minify