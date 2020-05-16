---
title: Google Apps Script の基本の基
tags: [googleAppsScript]
description: Google Apps Script の基本の基。
createdAt: 2020-05-12
---

** WIP **

## 作ったテンプレート

**TODO: 作ったテンプレートを置く** 下記はとりあえず暫定のもの。

https://github.com/hbsnow-sandbox/gas-read-example

## clasp でプッシュ

[@google/clasp](https://github.com/google/clasp) を使うことで CLI で GAS を扱うことができます。コード管理を Git でできるようになるため、導入しない理由がありません。

プッシュするまでの最短手順は以下になります。

1. `clasp login` でログイン
2. 『ファイル』->『プロジェクトのプロパティ』にある『スクリプト ID』をコピー
3. `.clasp.json` にペースト
4. https://script.google.com/home/usersettings で Google Apps Script API を有効化
5. `clasp push` でプッシュ

**TODO: CI で自動化したほうがいいのであとで追記する。**

## manifest file

『表示』->『マニュフェスト ファイルを表示』にチェックを入れると manifest file である appsscript.json がファイル一覧で確認できるようになります。

```json
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

少し古いものだと `runtimeVersion` の記述がなかったりしますが、最近のデフォルトでは上記のようになっているはずです。

- https://developers.google.com/apps-script/manifest

## ログ

ログの確認方法は 2 つあります。

1. `console.log`
2. `Logger.log`

基本的にデバッグでは `console.log` を使うことになります。`console.log` で出力される内容はメニューの表示にある Stackdriver Logging から確認できます。最初のうちは出力がどういったものになるのかイメージしにくいのでよく使いました。出力が把握できたら Jest などを使ったユニットテストを書いて開発すると効率がいいでしょう。

`Logger.log` はロガーです、ロギングしたいときに使います。

- https://developers.google.com/apps-script/reference/base/logger

## 環境変数

『ファイルのプロジェクト』->『プロジェクトのプロパティ』にあるスクリプトのプロパティから追加できます。

```js
const value = PropertiesService.getScriptProperties().getProperty('KEY')
```

追加した値は上記のように取得できます。

- https://developers.google.com/apps-script/reference/properties/properties

## 逆引き

**TODO: よく使いそうなコード断片を置く**
