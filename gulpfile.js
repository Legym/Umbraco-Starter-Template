// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var plumber      = require('gulp-plumber'); // To handle error events
var jshint       = require('gulp-jshint'); // To show JS errors
var cssmin       = require('gulp-cssmin'); // Minify
//var imagemin     = require('gulp-imagemin'); // Image Minification
var sass         = require('gulp-sass'); // Compile our Sass
var concat       = require('gulp-concat'); // Concatinate JS
var uglify       = require('gulp-uglify'); // Pass through Uglification
var rename       = require('gulp-rename'); // Rename files after compilation
var autoprefixer = require('gulp-autoprefixer'); // Automatically add CSS prefixes for greater CSS3 browser support
var notify       = require("gulp-notify"); // Ability to send error notifications
var beep = require('beepbeep'); // Make beeping noise if error

const imagemin = require('gulp-imagemin');




/* Move files from node_modules to proper destination*/
/* Run `Gulp pip` after npm install*/
gulp.task('pip-css', function() {
    gulp.src([
        'node_modules/jquery.mmenu/dist/css/jquery.mmenu.all.css',
    ])
        .pipe(gulp.dest('css/'));
});

gulp.task('pip-sass', function () {
    gulp.src([
        'node_modules/slick-carousel/slick/*.scss',

    ])
        .pipe(gulp.dest('scss/'));
});

gulp.task('pip-fonts', function () {
    gulp.src([
        'node_modules/font-awesome/fonts/*',
        'node_modules/slick-carousel/slick/fonts/*'
    ])
        .pipe(gulp.dest('fonts/'));
});



// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/vendor/base.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Noise Beep
var onError = function (err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message: err.toString()
    })(err);
    beep(3); // If I'm annoying remove me!!
    this.emit('end');
};


// Compile Our Sass
gulp.task('sass', function() {
    gulp.src([
        'css/jquery.mmenu.all.css',
        'css/jssocials-theme-flat.css',
        'css/jssocials.css',
        'css/jquery.fancybox.css',
        'scss/*.scss',
        ])
        .pipe(plumber({ errorHandler: onError }))
    	.pipe(sass(
        {
            includePaths: [
    	        'node_modules/foundation-sites/scss/',
                'node_modules/font-awesome/scss/',
            ]
        }))
		.pipe(cssmin())
		.pipe(autoprefixer({
		    browsers: ['last 5 versions'],
		}))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.min.css'))
		.pipe(gulp.dest('css/'))
        .pipe(notify({message: 'Sass complilation is complete!', onLast: true}));
});


// Compresses Images
gulp.task('images', function() {
    gulp.src('media/**')
        .pipe(imagemin())
        .pipe(gulp.dest('media'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src([
        "node_modules/foundation-sites/dist/foundation.min.js",
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/jquery.mmenu/dist/js/jquery.mmenu.all.min.js',
        "js/vendor/parallax.min.js",
        "js/vendor/jssocials.min.js",
        "js/vendor/jquery.matchHeight-min.js",
        "js/vendor/jquery.fancybox.pack.js",
        "js/base.js",
        "js/router.js"
	])
		.pipe(plumber())
		.pipe(concat('all.js'))
		.pipe(rename('mygelb.js'))
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('scripts/'))
        .pipe(notify({ message: 'JS compilation is complete!', onLast: true }));
});


// Pip
gulp.task('pip', ['pip-sass', 'pip-css', 'pip-fonts']);


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
