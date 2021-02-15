const {dest, src} = require('gulp')
const rename = require('gulp-rename')
const terser = require('gulp-terser')


function dev (cb){
   return src('d3-sugar.js')
    .pipe(terser())
    .pipe(rename({extname:'.min.js'}))
    .pipe(dest('dev'))
    cb()
}


exports.dev = dev