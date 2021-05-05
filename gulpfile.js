const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync'),
			reload = browserSync.reload,
			rigger = require('gulp-rigger'),  //= папка с шаблонами/название файла.html
			scss = require('gulp-sass'),
			preFixer = require('gulp-autoprefixer'),
			combineMedia = require('gulp-combine-media'),
			cssnano = require('gulp-cssnano'),
			del = require('del'),
			htmlmin = require('gulp-htmlmin'),
			concat = require('gulp-concat'),
			// uglify = require('gulp-uglifyjs'),
			rename = require('gulp-rename');

///////////////////////============HTML=============///////////////////////
function html() {
	return src("src/*.html")
			.pipe(rigger())
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(dest("dist/"))
			.pipe(reload({stream: true}));
}

function htmlTemplates() {
	return src("src/templates/*.html")
			.pipe(rigger())
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(dest("dist/templates/"))
			.pipe(reload({stream: true}));
}

///////////////////////============CSS=============///////////////////////
function styles() {
	return src("src/scss/**/*.+(scss|sass)")
	.pipe(scss().on('error', scss.logError))
	.pipe(preFixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) 
	.pipe(combineMedia())
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(dest("dist/css")) 
	.pipe(reload({stream: true}));
}

///////////////////////============JS=============///////////////////////
function scripts () {
	return src("src/js/**/*.js") 
	.pipe(rigger()) 
	.pipe(dest("dist/js")) 
	.pipe(reload({stream: true})); 
}

///////////////////////============LIBS=============///////////////////////
function styleLib() {
	return src("src/libs/css/**/*.css")
	.pipe(cssnano())
	.pipe(concat('libs.min.css'))
	.pipe(dest("dist/css"))
	.pipe(reload({stream: true})); 
}

function scriptLib() {
	return src("src/libs/js/**/*.js")
		.pipe(concat('libs.min.js'))
		// .pipe(uglify())
		.pipe(dest("dist/js"))
		.pipe(reload({stream: true})); 
}

/////////////////////============FONTS||IMG=============/////////////////////
function fonts() {
	return src("src/fonts/**/*")
	.pipe(dest("dist/fonts"))
	.pipe(reload({stream: true}));
}

function img() {
	return src("src/img/**/*") 
	.pipe(dest("dist/img")) 
	.pipe(reload({stream: true})); 
}

/////////////////////============WATCHER=============/////////////////////

async function watcher () {
    watch("src/*.html").on('change', html);
    watch("src/templates/*.html").on('change', series(htmlTemplates, html));
    watch("src/scss/**/*.+(scss|sass)").on('change', styles);
    watch("src/js/**/*.js").on('change', scripts);

    watch("src/libs/css/**/*.css").on('change', styleLib);
    watch("src/libs/js/**/*.js").on('change', scriptLib);

    watch("src/fonts/**/*").on('change', fonts);
    watch("src/img/**/*").on('change', img);
}

/////////////////////============SERVER||CLEAN=============/////////////////////
function server() {
	browserSync.init({
		server: 'dist'
	})
}

async function clean() {
	return del.sync('dist');
}

/////////////////////============LAUNCH_GULP=============/////////////////////
exports.dev = series(
    clean,
    parallel(html, htmlTemplates, styles, styleLib, fonts, img, scripts, scriptLib),
    watcher,
    server,
);

exports.prod = series(
    clean,
    parallel(html, htmlTemplates, styles, styleLib, fonts, img, scripts, scriptLib),
    server
)

