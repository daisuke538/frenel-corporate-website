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
<p>`web-dr-another-history`</p>
<p>∟`images` 表示したい画像を置く。</p>
<p>  ∟`eyecatch` 記事ページのhero画像を置く。画像のファイル名は`eyecatch.jpg`、画像サイズは3:1にする。</p>
<p>  ∟`thumbnail` トップページや記事一覧のサムネイル画像を置く。画像のファイル名は`thumbnail.jpg`、画像サイズは3:2にする。</p>
<p>  ∟画像データ 記事内で表示したい画像を置く。`index.md`内で画像を指定する。</p>
<p>∟`index.md` マークダウン形式で本文を書く。</p>

## メンバーリスト更新（トップページ）

- `data`フォルダにある`member.json`を編集する。


## その他トップページ更新

- `layouts`フォルダにある`index.html`を編集する。


## ビルド

- 公開用サーバーにアップするために、静的ファイルに変換する。
```sh
$ gulp hugo-build
```

- `public`フォルダが生成されるので、その中身を



