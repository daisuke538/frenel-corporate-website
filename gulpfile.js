var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' ); // CSSコンパイル
var cached       = require( 'gulp-cached' ); // 変更のあったもの（Sass）
var changed      = require( 'gulp-changed' ); // 変更のあったもの（画像）
var csscomb      = require( 'gulp-csscomb' ); //CSSプロパティ順序
var autoprefixer = require( 'gulp-autoprefixer' ); // ベンダープレフィックス
var gcmq         = require( 'gulp-group-css-media-queries' ); // CSSメディアクエリー整理
var notify       = require( 'gulp-notify' ); // エラーを通知
//var imageOptim   = require( 'gulp-imageoptim' ); // 画像圧縮
var imagemin     = require( 'gulp-imagemin' ); // 画像圧縮
//var imageminJpg  = require( 'imagemin-jpeg-recompress' ); // JPG画像圧縮
//var imageminPng  = require( 'imagemin-pngquant' ); // PNG画像圧縮
//var imageminGif  = require( 'imagemin-gifsicle' ); // GIF画像圧縮
//var svgemin      = require( 'gulp-svgmin' ); // SVG画像圧縮
var pngquant     = require( 'imagemin-pngquant' );
var mozjpeg      = require( 'imagemin-mozjpeg' );
var imageResize  = require( 'gulp-image-resize' );
var uglify       = require( 'gulp-uglify' ); // JS圧縮
var cleanCss     = require( 'gulp-clean-css' ); // CSS圧縮
var rename       = require( 'gulp-rename' ); // ファイルのリネーム
var glob         = require( 'glob-all' );
var filelog      = require( 'gulp-filelog' );
var plumber      = require( 'gulp-plumber' );
var eventStream  = require( 'event-stream' );

var pathsCss = {
  'scss': 'static/scss/',
  'css': 'public/css/'
}

//////////////////
// CSSコンパイル //
/////////////////
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
      .pipe( gulp.dest( pathsCss.css ) )
      .pipe( notify(
             {
               title: 'Sassをコンパイルしました。',
               message: new Date(),
               sound: 'Tink',
             }
      ) );
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



///////////////////////////
// 記事のサムネイル画像生成 //
//////////////////////////
var pathsThumb = {
  originDir: 'content/posts/**/images/thumbnail/',
  outputDir: 'public/posts/**/images/thumbnail/',
  prvDir : 'prv',
  dstDir : 'prd'
}

gulp.task( 'image-resize:thumb', function() {
  var originGlobs   = glob.sync( pathsThumb.originDir );
  var outputGlob   = pathsThumb.outputDir;
  var targetFile   = '*.+(jpg|jpeg|png|gif)';

  var resizeOptions = {
    // 記事のサムネイル画像サイズを設定
    width       : 300,
    height      : 200,
    gravity     : 'Center',
    crop        : true,
    upscale     : false,
    imageMagick : true
  };

  var imageminOptions = {
    optimizationLevel: 7
  };

  for( var item in originGlobs ) {
    var originGlob = originGlobs[item] + targetFile;
    var dstGlob    = originGlobs[item];

    gulp.src( originGlob )
        //.pipe( changed( dstGlob ) )
        .pipe( imageResize( resizeOptions ) )
        .pipe( gulp.dest( dstGlob ) )
        .pipe( filelog() )
        .pipe( notify({
          title: '記事のサムネイル画像を生成しました。',
          message: new Date(),
          sound: 'Tink'
        }) );
  }
});

gulp.task( 'image-resize-thumb', ['image-resize:thumb'] );

/////////////
// デプロイ //
/////////////


/////////////////
// 監視フォルダ //
////////////////
gulp.task( 'watch', function(){
  gulp.watch( 'static/scss/*.scss', ['sass'] ); // Sassファイルに変更があると起動
  gulp.watch( 'static/images/**/*.+(jpg|jpeg|png|gif|svg)', ['imagemin'] ); // 画像に変更があると起動
});

///////////////////////////
// gulpコマンドで動かすもの //
//////////////////////////
gulp.task( 'default', ['watch', 'sass', 'imagemin'] );
