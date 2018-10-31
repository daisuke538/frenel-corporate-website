$( function(){
  /////////////////////////
  // リンク先のstaging対応 //
  /////////////////////////
  /*
  var domain = location.host;
  var production = 'frenel.jp';
  var staging = 'staging.frenel.jp';
  var localhost = 'localhost:1313'


  $( window ).on( 'load', function(){
    if( domain == staging ){
      var replace = null;
      var replace = $( '.replace-domain' ).attr( 'href' ).replace( production, staging );
      $( '.replace-domain' ).attr( 'href', replace );

      var replace = $( '.replace-domain' ).attr( 'src' ).replace( production, staging );
      $( '.replace-domain' ).attr( 'src', replace );
    }
  } );
  */
  ////////////////////////////
  // ページ内スムーズスクロール //
  ///////////////////////////
  // #にダブルクォーテーションが必要
  $( 'li > a[href^="#"], .home-nav_logo, .home-nav-sp_logo' ).click( function(){
    var ua = navigator.userAgent;
    var width = $( window ).width();
    var speed = 800;
    var href= $( this ).attr( "href" );
    var target = $( href == "#" || href == "" ? 'html' : href );
    console.log(href);
    if( ua.indexOf( 'iPhone' ) > 0 || ua.indexOf( 'iPod' ) > 0 || ua.indexOf( 'Android' ) > 0 && ua.indexOf( 'Mobile' ) > 0 || width <= 768 ){
      $( '.home-nav_menu .menu-trigger' ).toggleClass( 'active' );
      $( '.home-nav-sp' ).fadeOut( 'slow' );
    }

    var position = target.offset().top;
    $( 'body, html' ).animate( { scrollTop: position }, speed, 'swing' );

    return false;
  } );

  /////////////////////////////////////////////////
  // スクロールトップボタンのフェードイン/フェードアウト //
  /////////////////////////////////////////////////
  // 「ページトップへ戻るボタン」の要素を隠します
  $( '.scroll-top' ).hide();
  // スクロールした場合のアクションが記されています
  $( window ).scroll( function(){
    // スクロール位置が200pxを超えた場合に「ページトップへ戻るボタン」をフェードインで出現させる
    if( $( this ).scrollTop() > 150 ) {
      $( '.scroll-top' ).fadeIn( 'slow' );
    }
    // スクロール位置が200px以下の場合は「ページトップへ戻るボタン」を消しておく（フェードアウトで消える）
    else {
      $( '.scroll-top' ).fadeOut();
    }
  });
  // 「ページトップへ戻るボタン」をクリックした場合のページトップへ戻るスピードの速さが記されています
  $( '.scroll-top' ).click( function(){
    $( 'html, body' ).animate( { scrollTop: 0 }, 500 );
    return false;
  } );

  ////////////////////////////////////////
  // SP用ナビゲーションメニュータップ時の挙動 //
  ////////////////////////////////////////
  var menuSp = '.home-nav-sp';

  $( '.home-nav_menu .menu-trigger' ).on( 'click', function(){
    $( this ).toggleClass( 'active' );
    $( menuSp ).fadeToggle();
    return false;
  } );

} );

// jQuery3.x系では、loadを利用するとき $( function(){} の外に出す。
////////////////////////////////
// 各ページを移動+フェードイン表示 //
////////////////////////////////
$( window ).on( 'load', function(){
  $( window ).scroll( function(){
    $( '.display-effect' ).each( function(){
      var POS = $( this ).offset().top;
      var scroll = $( window ).scrollTop();
      var windowHeight = $( window ).height();

      if( scroll > POS - windowHeight ){
        $( this ).css( {
          'opacity':'1',
          'transform':'translateY( 0 )',
          '-webkit-transform':'translateY( 0 )',
          '-moz-transform':'translateY( 0 )',
          '-ms-transform':'translateY( 0 )'
        });
      } else{
        $( this ).css( {
          'opacity':'0',
          'transform':'translateY( 70px )',
          '-webkit-transform':'translateY( 70px) ',
          '-moz-transform':'translateY( 70px )',
          '-ms-transform':'translateY( 70px )'
        } );
      }
    } );
  } );
} );
