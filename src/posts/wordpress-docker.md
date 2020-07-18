---
title: Docker による WordPress のローカル開発環境構築
tags: [wordpress, docker]
description: Docker で WordPress のローカル開発環境を構築する。
createdAt: 2018-05-11
updatedAt: 2020-07-11
---

WordPress の環境構築には [VCCW](https://github.com/vccw-team/vccw) という Vagrant を使用する Starter もありますが、私自身は使用したことがないので、ツールの比較については言及していません。

また、[Laradock](https://laradock.io/) でも WordPress をサポートしているようです。

制作物は以下になります。

- [hbsnow/wordpress-docker](https://github.com/hbsnow/wordpress-docker)

## とりあえず動かす

[Quick Start](https://docs.docker.com/compose/wordpress/) を参考に、起動するまで手順を進めます。日本語の翻訳もありますが、内容がかなり古いこともあるので英語版がおすすめです。

| コマンド                        | 解説                                  |
| ------------------------------- | ------------------------------------- |
| `docker-compose up -d`          | detached mode、バックグラウンドで実行 |
| `docker-compose down`           | 終了                                  |
| `docker-compose down --volumes` | 終了してデータベースを削除            |

## ファイルの永続化

ちょっとした確認だけを行うだけであれば上記の `docker-compose.yml` で困ることはありませんが、起動のたび `wp-content` 内のデータが消えるのは開発環境として好ましくありません。そのため該当のディレクトリを永続化させる必要があるでしょう。

[volumes](https://docs.docker.com/compose/compose-file/#volumes) の項目を参考に、ホストとコンテナをマッピングします。

```yml
volumes:
  - ./wp-content:/var/www/html/wp-content
```

## WP-CLI

WorpPress を使用するうえで、[WP-CLI](https://wp-cli.org/ja/) はあると非常に便利です。

WP-CLI について詳しくは [WP-CLI をハンズオン形式で学ぶ](/blog/wordpress-cli/) で解説しています。
