// Include Gulp
var gulp = require('gulp'),
    uglify = require('gulp-uglify-es').default,
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    nested = require('postcss-nested'),
    precss = require('precss'),
    cssImport = require('postcss-import'),
    cache = require('gulp-cache');
    imagemin = require('gulp-imagemin'),
    mqpacker = require('css-mqpacker'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    flexbugs = require('postcss-flexbugs-fixes'),
    babel = require('gulp-babel'),
    del = require('del'),
    merge = require('merge-stream')
    exec = require('child_process').exec;

// CSS
gulp.task('css', function(){
  // del(['template/racines.css']);
  var processors = [
    cssImport(),
    nested(),
    precss(),
    mqpacker({
      sort: true
    }),
    autoprefixer(),
    flexbugs(),
    cssnano({
      reduceIdents: false,
      normalizeUrl: {
        stripWWW: false
      }
    })
  ];
  return gulp.src('template/src/css/racines.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('template/'));
});

//compress all images
 gulp.task('img', () => {
   return gulp.src('template/src/img/**')
        .pipe(cache(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
              ]
          })
        ], {
            verbose: true
        }
        )))
        .pipe(gulp.dest('template/img/'));
});

// Javascript
  // del(['template/racines.js']);
gulp.task('javascript', function(){
  var script = gulp.src(['template/src/js/**'])
    .pipe(concat('racines.js'))
    .pipe(uglify())
    .pipe(gulp.dest('template/'));
  return merge(script);
});

// Clear cache
gulp.task('clear', () =>
    cache.clearAll()
);

gulp.task(
  'pandoc-simple',
  gulp.series(
  function (cb) {
  exec("make html", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  }
  )
);
gulp.task(
  'pandoc',
  gulp.series(
    'css', 'img', 'javascript',
  function (cb) {
  exec("make html", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  }
  )
);

// Browser-sync
gulp.task('browser-sync', function(cb) {
  browserSync({
    server: {
      baseDir: "public"
    },
    open: false
  }, cb);
});

function reload(done) {
  browserSync.reload();
  done();
}
gulp.task('watch', function () {
  gulp.watch([
    'text/**',
    'template/*.html',
  ], gulp.series('pandoc-simple', reload));
  gulp.watch([
    'template/src/css/**',
  ], gulp.series('css', 'pandoc-simple', reload));
  gulp.watch([
    'template/src/js/**',
  ], gulp.series('javascript', 'pandoc-simple', reload));
  gulp.watch([
    'template/src/img/**',
  ], gulp.series('img', 'pandoc-simple', reload));
});

gulp.task(
  'default',
  gulp.series('pandoc', 'browser-sync', 'watch')
);

