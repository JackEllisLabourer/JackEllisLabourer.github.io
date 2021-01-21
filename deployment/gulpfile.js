// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
var gulp =  require('gulp');
// Importing all the Gulp-related packages we want to use
const purgecss = require('gulp-purgecss');

// File paths
const files = {

    cssPath: '../css/style.css',
}

gulp.task('purgecss', () => {
    return gulp.src(files.cssPath)
        .pipe(purgecss({
            content: ['../*.html', '../*.php', '../**/*.php', '../**/*.js'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            whitelist: ['sub-menu', 'menu-item-has-children'],
        }))
        .pipe(gulp.dest('../'))
})

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = gulp.series(
    gulp.parallel('purgecss')
    // watchTask
);
