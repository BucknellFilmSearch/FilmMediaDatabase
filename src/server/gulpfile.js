var gulp = require('gulp');
var babel = require('gulp-babel');
var json = require('gulp-json-editor');
var path = require('path');

// Compile babel and move files to build directory
gulp.task('default', function() {

  const buildDir = path.join(__dirname, '..', '..', 'build');

  // Modify package.json scripts
  gulp.src('package.json').pipe(json((_json) => {
    delete _json.scripts.build;
    delete _json.scripts.clean;
    delete _json.scripts.lint;
    delete _json.devDependencies;
    _json.scripts.start = 'node index.js';
    return _json;
  })).pipe(gulp.dest(buildDir));

  // Pipe all JS files and JSON configs
  gulp.src('src/**/*.js').pipe(babel()).pipe(gulp.dest(buildDir));
  gulp.src('src/**/*.json').pipe(gulp.dest(buildDir));

  // Move static files
  const staticDir = path.join(__dirname, '..', 'static');
  gulp.src(path.join(staticDir, 'css/*')).pipe(gulp.dest(path.join('static/css')));
  gulp.src(path.join(staticDir, 'imageFiles/*')).pipe(gulp.dest(path.join('static/imageFiles')));
  gulp.src(path.join(staticDir, 'index.html')).pipe(gulp.dest(path.join('static')));
  gulp.src(path.join(staticDir, 'js/bundle.js')).pipe(gulp.dest(path.join('static/js')));
});
