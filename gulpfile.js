const {dest, src} = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const terser = require('gulp-terser')


function minify (cb){
   return src('d3-sugar.js')
    .pipe(terser())
    .pipe(rename({extname:'.min.js'}))
    .pipe(dest('dist'))
    cb()
}

exports.min = minify