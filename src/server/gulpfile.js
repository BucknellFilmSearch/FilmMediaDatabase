'use strict';

var babel = require('gulp-babel');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var clean = require('gulp-clean');
var gulp = require('gulp');
var json = require('gulp-json-editor');
var path = require('path');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

const buildDir = path.join(__dirname, '..', '..', 'build');
const credDir = path.join(__dirname, '..', '..', 'credentials');
const staticDir = path.join(__dirname, 'src', 'static');
const jsDir = path.join(staticDir, 'js');

// Compile babel and move files to build directory
gulp.task('default', ['build']);

gulp.task('clean-build', ['clean', 'build']);

gulp.task('build', ['build-ui'], () => {

  // Modify package.json scripts
  gulp.src('package.json').pipe(json((_json) => {
    delete _json.scripts.build;
    delete _json.scripts.clean;
    delete _json.scripts.lint;
    delete _json.devDependencies;
    _json.scripts.start = 'NODE_ENV=production node index.js';
    return _json;
  })).pipe(gulp.dest(buildDir));

  // Pipe all JS files and JSON configs
  gulp.src(['src/**/*.js', '!src/**/static/**/*']).pipe(babel()).pipe(gulp.dest(buildDir));
  gulp.src('src/**/*.json').pipe(gulp.dest(buildDir));
  gulp.src('pm2_config.yml').pipe(gulp.dest(buildDir));
  gulp.src(path.join(credDir, 'postgres', 'config.json')).pipe(gulp.dest(path.join(buildDir, 'postgres')));
  gulp.src(path.join(credDir, 'contact', 'config.json')).pipe(gulp.dest(path.join(buildDir, 'api', 'contact')));

  // Move static files
  gulp.src(path.join(staticDir, 'css', '*')).pipe(gulp.dest(path.join(buildDir, 'static', 'css')));
  gulp.src(path.join(staticDir, 'imageFiles', '*')).pipe(gulp.dest(path.join(buildDir, 'static', 'imageFiles')));
  gulp.src(path.join(staticDir, 'index.html')).pipe(gulp.dest(path.join(buildDir, 'static')));
  gulp.src(path.join(staticDir, 'js', '*.js')).pipe(gulp.dest(path.join(buildDir, 'static', 'js')));
});

// Build the UI
gulp.task('build-ui', () => {
  return browserify({
    entries: path.join(jsDir, 'app.jsx'),
    debug: false,
    transform: [
      ['envify', {
        NODE_ENV: 'development'
      }],
      ['babelify', {
        presets: ['env', 'react'],
        plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
      }]
    ]
  })
  .bundle()
  .pipe(source(path.join(jsDir, 'app.jsx')))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest(jsDir));
});

// Clean the build directory up
gulp.task('clean', () => {
  return gulp.src(buildDir, {read: false})
        .pipe(clean({force: true}));
});
