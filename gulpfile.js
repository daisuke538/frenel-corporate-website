var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' ); // CSSコンパイル
var cached       = require( 'gulp-cached' ); // 変更のあったもの（Sass）
var changed      = require( 'gulp-changed' ); // 変更のあったもの（画像）
var csscomb      = require( 'gulp-csscomb' ); //CSSプロパティ順序
var autoprefixer = require( 'gulp-autoprefixer' ); // ベンダープレフィックス
var gcmq         = require( 'gulp-group-css-media-queries' ); // CSSメディアクエリー整理
var notify       = require( 'gulp-notify' ); // エラーを通知
var imagemin     = require( 'gulp-imagemin' ); // 画像圧縮
var pngquant     = require( 'imagemin-pngquant' );
var mozjpeg      = require( 'imagemin-mozjpeg' );
var imageResize  = require( 'gulp-image-resize' );
var uglify       = require( 'gulp-uglify' ); // JS圧縮
var cleanCss     = require( 'gulp-clean-css' ); // CSS圧縮
var rename       = require( 'gulp-rename' ); // ファイルのリネーム
var glob         = require( 'glob-all' );
var filelog      = require( 'gulp-filelog' );
var plumber      = require( 'gulp-plumber' );
var shell        = require( 'gulp-shell' );

//////////////////
// CSSコンパイル //
/////////////////
var pathsCss = {
  'scss': 'static/scss/',
  'css': 'static/css/'
}

gulp.task( 'sass', function(){
  gulp.src( pathsCss.scss + "*scss" )
      .pipe( cached( 'sass' ) )
      .pipe( plumber(
             {
               errorHandler: function( err ){
                 console.log( err.messageFormatted );
                 this.emit( 'end' );
               }
             }
      ) )
      .pipe( csscomb() )
      .pipe( sass(
             {
               outputStyle: 'expanded'
             }
      ) )
      .pipe( autoprefixer() )
      .pipe( gcmq() )
      //.pipe( rename( 'style.css' ) )
      .pipe( gulp.dest( pathsCss.css ) );

      console.log( 'Sassをコンパイルしました。' ) ;
      /*
      .pipe( notify(
             {
               title: 'Sassをコンパイルしました。',
               message: new Date(),
               sound: 'Tink',
             }
      ) );
      */
});

////////////////////////////////////////
// 画像圧縮（変更・追加されたもののみ圧縮） //
///////////////////////////////////////
var pathsImagemin = {
  originDir: 'static/images/origin/',
  outputDir: 'static/images/'
}

gulp.task( 'imagemin', function(){
  var originGlob      = pathsImagemin.originDir + '*.+(jpg|jpeg|png|gif|svg)';
  var imageminOptions = {
    optimizationLevel: 7
  };

  gulp.src( originGlob )
      .pipe( changed( pathsImagemin.outputDir ) )
      .pipe( imagemin([
         pngquant({
           quality: '65-80',
           speed: 1,
           floyd: 0
         }),
         mozjpeg({
           quality: 85,
           progressive: true
         }),
         imagemin.svgo(),
         imagemin.optipng(),
         imagemin.gifsicle()
      ]) )
      .pipe( gulp.dest( pathsImagemin.outputDir ) )
      .pipe( notify({
        title: 'JPG画像を圧縮しました。',
        message: new Date(),
        sound: 'Tink'
      }) );
} );

/// ここまでOK。変数被りに注意！ ///

//////////////////////////////////
// サムネイル（アイキャッチ）画像生成 //
//////////////////////////////////
gulp.task( 'image-resize', function() {
  var srcThumbGlobs = glob.sync( 'content/posts/**/images/thumbnail/' );
  var srcEyeGlobs   = glob.sync( 'content/posts/**/images/eyecatch/' );
  var srcDir        = 'origin';
  var targetFile    = '/*.+(jpg|jpeg|png|gif)';

  var thumbResizeOptions = {
    // 記事のサムネイル画像サイズを設定
    width       : 300,
    height      : 200,
    gravity     : 'Center',
    crop        : true,
    upscale     : false,
    imageMagick : true
  };

  var eyeResizeOptions = {
    // 記事のアイキャッチ画像サイズを設定
    width       : 1800,
    height      : 900,
    gravity     : 'Center',
    crop        : true,
    upscale     : false,
    imageMagick : true
  };

  // サムネイルのリサイズ
  for( var item in srcThumbGlobs ) {
    var srcGlob = srcThumbGlobs[item] + srcDir + targetFile;
    var dstGlob = srcThumbGlobs[item];
    //console.log( srcGlob );
    //console.log( dstGlob );

    gulp.src( srcGlob )
      .pipe( changed( dstGlob ) )
      .pipe( imageResize( thumbResizeOptions ) )
      .pipe( rename( 'thumbnail.jpg' ) )
      .pipe( gulp.dest( dstGlob ) )
      .pipe( filelog() );
  }

  // アイキャッチのリサイズ
  for( var item in srcEyeGlobs ) {
    var srcGlob = srcEyeGlobs[item] + srcDir + targetFile;
    var dstGlob = srcEyeGlobs[item];

    gulp.src( srcGlob )
      .pipe( changed( dstGlob ) )
      .pipe( imageResize( eyeResizeOptions ) )
      .pipe( rename( 'eyecatch.jpg' ) )
      .pipe( gulp.dest( dstGlob ) )
      .pipe( filelog() );
  }
});


/////////////
// デプロイ //
/////////////


/////////////////
// 監視フォルダ //
////////////////
gulp.task( 'watch', function(){
  gulp.watch( 'static/images/origin/*', ['imagemin'] );
  gulp.watch( 'content/posts/**/images/thumbnail/origin/*', ['image-resize'] );
  gulp.watch( 'content/posts/**/images/eyecatch/origin/*', ['image-resize'] );
  gulp.watch( 'static/scss/*.scss', ['sass'] ); // Sassファイルに変更があると起動
  // gulp.watch( 'static/images/**/*.+(jpg|jpeg|png|gif|svg)', ['imagemin'] ); // 画像に変更があると起動
});

////////////////
// Server起動 //
///////////////
gulp.task( 'hugo-server', shell.task([
  'hugo server -w'
]) );

////////////////
// Hugoビルド //
///////////////
gulp.task( 'hugo-build', shell.task([
  'rm -rf ./public/*',
  'hugo',
  'rm -rf ./public/scss',
  'rm -rf ./public/images/origin'
]) );

///////////////////////////
// gulpコマンドで動かすもの //
//////////////////////////
gulp.task( 'default', ['sass'] );
