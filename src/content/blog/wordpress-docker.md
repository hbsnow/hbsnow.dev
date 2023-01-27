---
layout: "@/layouts/BlogPostLayout.astro"
title: Docker による WordPress のローカル開発環境構築
tags: [wordpress, docker]
description: Docker で WordPress のローカル開発環境を構築する。
createdAt: 2018-05-11
updatedAt: 2020-07-24
---

WordPress の環境構築には [VCCW](https://github.com/vccw-team/vccw) という Vagrant を使用する Starter もありますが、私自身は使用したことがないので、ツールの比較については言及していません。

また、[Laradock](https://laradock.io/) でも WordPress をサポートしているようです。

制作物は以下になります。

https://github.com/hbsnow/wordpress-docker

## とりあえず動かす

[Quick Start](https://docs.docker.com/compose/wordpress/) を参考に、起動するまで手順を進めます。日本語の翻訳もありますが、内容がかなり古いこともあるので英語版がおすすめです。

| コマンド                        | 解説                                  |
| ------------------------------- | ------------------------------------- |
| `docker-compose up -d`          | detached mode、バックグラウンドで実行 |
| `docker-compose down`           | 終了                                  |
| `docker-compose down --volumes` | 終了してデータベースを削除            |

## WordPress

WP-CLI とそれに必要な `mysql-client` などを追加でインストールしています。また、共有したディレクトリについては、Apache の実行ユーザに所有を変更しています。

`php.ini` にある設定の追加は WP-CLI の `wp package install wp-cli/profile-command` のインストールのために追記してあります。

### WP-CLI

WorpPress を使用するうえで、[WP-CLI](https://wp-cli.org/ja/) はあると非常に便利です。

WP-CLI について詳しくは [WP-CLI まとめ](/blog/wordpress-cli/) で解説しています。

## MySQL

コンテナ内で日本語を使いたいのでインストールと設定しています。

`my.cnf` でいくつか設定の変更・追加をしています。`initdb.d/init.sql` はコンテナ起動時に実行されます。

## ファイルの永続化

ちょっとした確認だけを行うだけであれば上記の `docker-compose.yml` で困ることはありませんが、起動のたび `wp-content` 内のデータが消えるのは開発環境として好ましくありません。そのため該当のディレクトリを永続化させる必要があるでしょう。

[volumes](https://docs.docker.com/compose/compose-file/#volumes) の項目を参考に、ホストとコンテナをマッピングします。

```
volumes:
  - ./wp-content:/var/www/html/wp-content
```
