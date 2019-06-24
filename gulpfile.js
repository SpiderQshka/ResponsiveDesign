const {src, dist, watch, series, task, parallel} = require('gulp'),
	  sass = require('gulp-sass'),
	  sync = require("browser-sync"),
	  imagemin = require('imagemin'),
	  prefixer = require('gulp-autoprefixer'),
	  browserSync = require('browser-sync').create();

var path = {
	src: {
		html: 'src/html/**/*.html',
		style: 'src/styles/**/*.scss',
		js: 'src/js/**/*.js',
		image: 'src/img/**/*.*',
		fonts: 'src/fonts/*.*'
	},
	dist: {
		html: 'dist/html/',
		style: 'dist/styles/',
		js: 'dist/js/',
		image: 'dist/img/',
		fonts: 'dist/fonts/'
	}
};

task('webserver', function(){
	browserSync.init({
	    server: {
	        baseDir: "./dist",
	       	index: './html/index.html'
	    },
	    tunnel: true,
	    host: 'localhost',
	    port: 3000
	});
})

task('distHTML', function(){
	return src(path.src.html)
		.pipe(dist(path.dist.html))
		.pipe(browserSync.stream());
});

task('distStyles', function(){
	return src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(dist(path.dist.style))
		.pipe(browserSync.stream());
});

task('distScripts', function(){
	return src(path.src.js)
		.pipe(dist(path.dist.js))
		.pipe(browserSync.stream());
});

task('distImages', function(){
	return src(path.src.image)
		.pipe(dist(path.dist.image))
		.pipe(browserSync.stream());
});

task('distFonts', function(){
	return src(path.src.fonts)
		.pipe(dist(path.dist.fonts))
		.pipe(browserSync.stream());
});

task('watchHTML', function(){
	watch(path.src.html, series('distHTML'));
});

task('watchStyles', function(){
	watch(path.src.style, series('distStyles'));
});

task('watchScripts', function(){
	watch(path.src.js, series('distScripts'));
});

task('watchImages', function(){
	watch(path.src.image, series('distImages'));
});

task('watchFonts', function(){
	watch(path.src.fonts, series('distFonts'));
});

task('watchAll', parallel('watchHTML', 'watchStyles', 'watchScripts', 'watchImages', 'watchFonts'));

task('default', parallel('webserver', 'watchAll'));