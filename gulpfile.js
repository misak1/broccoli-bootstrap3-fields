var gulp = require('gulp');
var autoprefixer = require("gulp-autoprefixer");//CSSにベンダープレフィックスを付与してくれる
var minifyCss = require('gulp-minify-css');//CSSファイルの圧縮ツール
var uglify = require("gulp-uglify");//JavaScriptファイルの圧縮ツール
var concat = require('gulp-concat');//ファイルの結合ツール
var plumber = require("gulp-plumber");//コンパイルエラーが起きても watch を抜けないようになる
var rename = require("gulp-rename");//ファイル名の置き換えを行う
var twig = require("gulp-twig");//Twigテンプレートエンジン
var browserify = require("gulp-browserify");//NodeJSのコードをブラウザ向けコードに変換
var packageJson = require(__dirname+'/package.json');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");  // rename
var _tasks = [
	'forYoungcornJS',
	'test/main.js',
	'copy',
	'styl'
];

// bootstrap3-button-field.js (front側) を処理
// gulp.task("bootstrap3-button-field.js", function() {
// 	gulp.src(["src/bootstrap3-button-field.js"])
// 		.pipe(plumber())
// 		.pipe(browserify({}))
// 		.pipe(concat('bootstrap3-button-field.js'))
// 		.pipe(gulp.dest( './dist/' ))
// 		.pipe(gulp.dest( './tests/testdata/htdocs/libs/' ))
// 		// .pipe(concat('bootstrap3-button-field.min.js'))
// 		.pipe(rename({extname: '.min.js'}))
// 		.pipe(uglify())
// 		.pipe(gulp.dest( './dist/' ))
// 		.pipe(gulp.dest( './tests/testdata/htdocs/libs/' ))
// 	;
// });
gulp.task("forYoungcornJS", function() {
	gulp.src(["src/*.js"])
		.pipe(plumber())
		.pipe(browserify({}))
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './tests/testdata/htdocs/libs/' ))
		.pipe(rename({extname: '.min.js'}))
		.pipe(uglify())
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './tests/testdata/htdocs/libs/' ))
	;
});

// test/main.js を処理
gulp.task("test/main.js", function() {
	gulp.src(["tests/testdata/htdocs/index_files/main.src.js"])
		.pipe(plumber())
		.pipe(browserify({}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest( './tests/testdata/htdocs/index_files/' ))
	;
});

gulp.task("copy", function() {
	gulp.src(["./libs/css/**/*"])
		.pipe(gulp.dest( './tests/testdata/htdocs/libs/bs3/css/')) // テスト用
		.pipe(gulp.dest( './dist/css/' )) // 本番用
	;
	gulp.src(["./libs/js/**/*"])
		.pipe(gulp.dest( './tests/testdata/htdocs/libs/bs3/js/')) // テスト用
		.pipe(gulp.dest( './dist/js/' )) // 本番用
	;
	gulp.src(["./libs/fonts/**/*"])
		.pipe(gulp.dest( './tests/testdata/htdocs/libs/bs3/fonts/')) // テスト用
		.pipe(gulp.dest( './dist/fonts/' )) // 本番用
	;
	// broccoli更新
	gulp.src(["./node_modules/broccoli-html-editor/client/dist/*"])
		.pipe(gulp.dest( './tests/testdata/htdocs/libs/' ))
});

// css
gulp.task('styl', function () {
  gulp.src('libs/css/bootstrap4broccoli.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('libs/css/'));
});

// src 中のすべての拡張子を監視して処理
gulp.task("watch", function() {
	gulp.watch(["src/**/*","libs/**/*","tests/testdata/htdocs/index_files/*.src.js"], _tasks);

	// var port = packageJson.baobabConfig.defaultPort;
	// var svrCtrl = require('baobab-fw').createSvrCtrl();
	// svrCtrl.boot(function(){
	// 	require('child_process').spawn('open',[svrCtrl.getUrl()]);
	// });
});

// src 中のすべての拡張子を処理(default)
gulp.task("default", _tasks);
