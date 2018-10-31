# コーポレートサイト環境設定

※Macでの作業を想定しています

## ローカル環境設定

- PCでターミナルを開く。ターミナル上で作業を行う。

- 作業したいディレクトリまで移動する。多いのはホームディレクトリ（Macの場合は /Users/ユーザー名）。以下のコマンドを実行して、ホームディレクトリへ移動する。
```sh
$ cd ~/
```

- Githubからリポジトリをローカルにクローン（複製）する。ホームディレクトリで以下のコマンドを実行する。
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




## 記事更新






