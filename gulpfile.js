let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');

gulp.task('default', ['imagemin']);

gulp.task('imagemin', function() {
 return gulp.src('img/bigboys/*')
 .pipe(imagemin({
  progressive: true,
  use: [pngquant()],
  }))
  .pipe(gulp.dest('img'));
});
