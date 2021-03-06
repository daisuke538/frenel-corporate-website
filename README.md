# コーポレートサイト環境設定

※Macでの作業を想定しています

## ローカル環境設定

- PCでターミナルを開く。ターミナル上で作業を行う。

- 作業したいディレクトリまで移動する。多いのはホームディレクトリ（Macの場合は /Users/ユーザー名）。以下のコマンドを実行して、ホームディレクトリへ移動する。
```sh
$ cd ~/
```

- Githubからリポジトリをローカル（PC）にクローン（複製）する。ホームディレクトリで以下のコマンドを実行する。
```sh
$ git clone https://github.com/frenel-llc/frenel-corporate-website.git
```

- 上の操作で作成されたディレクトリ（frenel-corporate-website）へ移動する。
```sh
$ cd frenel-corporate-website
```

- Hugoをインストールする。
```sh
$ brew update
$ brew install hugo
```

- `package.json` の情報（ライブラリ）をインストールする。
```sh
$ npm install
```

## ローカルサーバー起動

- 自分のPCでサイトの状況を見るために、仮想サーバーを起動する。
```sh
$ hugo server -w
```

- ブラウザで`http://localhost:1313`にアクセスすると、ローカル環境のサイトを閲覧することができる。

## 記事更新

- `content`フォルダ -> `news`フォルダに、作成したい記事のフォルダを作成する。

`web-dr-another-history`を例にすると<br>
`web-dr-another-history`<br>
∟`images` 表示したい画像を置く。<br>
...∟`eyecatch` 記事ページのhero画像を置く。画像のファイル名は`eyecatch.jpg`、画像サイズは3:1にする。<br>
...∟`thumbnail` トップページや記事一覧のサムネイル画像を置く。画像のファイル名は`thumbnail.jpg`、画像サイズは3:2にする。<br>
...∟画像データ 記事内で表示したい画像を置く。`index.md`内で画像を指定する。<br>
∟`index.md` マークダウン形式で本文を書く。<br>

## KADODEクリエイターリスト更新

- `content`フォルダ -> `kadode`フォルダ -> 該当するクリエイターカテゴリーのフォルダに、追加したいクリエイターのフォルダを作成する。

`masuda-miku`を例にすると<br>
`masuda-miku`<br>
∟`images` 表示したい画像を置く。<br>
...∟`eyecatch` クリエイターページのhero画像を置く。画像のファイル名は`eyecatch.jpg`、画像サイズは3:2にする。<br>
...∟画像データ ページ内で表示したい画像を置く。`index.md`内で画像を指定する。<br>
∟`index.md` マークダウン形式で本文を書く。<br>

## メンバーリスト更新（トップページ）

- `data`フォルダにある`member.json`を編集する。

## その他トップページ更新

- `layouts`フォルダにある`index.html`を編集する。

## ビルド

- 編集内容を公開用サーバーにアップするために、静的ファイルに変換する。
```sh
$ gulp hugo-build
```

- `public`フォルダが生成されるので、その中身をFTPツールを使い、公開用サーバーへアップロードする。アップロード先は、`frenel` -> `frenel.jp` -> `public_html`



