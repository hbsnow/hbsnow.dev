---
title: Docker による Wordpress のローカル開発環境構築
tags: [wordpress, docker]
description: Docker で Wordpress のローカル開発環境を構築する。
createdAt: 2018-05-11
updatedAt: 2019-10-02
---

ここには Docker のインストールなどのごく初歩的な解説はありません。

Wordpress の環境構築には [VCCW](https://github.com/vccw-team/vccw) という Vagrant を使用する Starter もありますが、私自身は使用したことがないので、これらの比較については言及していません。

また、[Laradock](https://laradock.io/) でも Wordpress をサポートしているようです。

## とりあえず動かす

[Quick Start](https://docs.docker.com/compose/wordpress/) を参考に、起動するまで手順を進めます。日本語の翻訳もありますが、内容がかなり古いこともあるので英語版がおすすめです。

動かすまでの手順としては `docker-compose.yml` をコピーし、`docker-compose up -d` を入力するだけになります。`docker-compose help up` で調べることができますが、`-d` は detached mode、バックグラウンドで実行していることを意味しています。

終了したい場合には、`docker-compose down` を入力してください。データベースの削除をしたい場合には `docker-compose down --volumes` とオプションをつけます。

## ファイルの永続化

ちょっとした確認だけを行うだけであれば上記の `docker-compose.yml` で困ることはありませんが、起動のたび `wp-content` 内のデータが消えるのは開発環境として好ましくありません。そのため該当のディレクトリを永続化させる必要があるでしょう。

[volumes](https://docs.docker.com/compose/compose-file/#volumes) の項目を参考に、ホストとコンテナをマッピングします。

```yml
volumes:
  - ./wp-content:/var/www/html/wp-content
```

## WP-CLI

公式の指示通りにコマンドを入力するたけです。container 名は `docker ps` で取得できるので、適宜置き換えてください。

```bash
docker run -it --rm \
    --volumes-from some-wordpress \
    --network container:some-wordpress \
    wordpress:cli user list
```

上記コマンドでインストール時に設定したユーザが表示されれば成功です。

## phpMyAdmin

Wordpress と関係はなく必要性もあまり感じないのですが、なぜか一定数の需要があったりするので設定をメモしておきます。基本的には不要です。

```yml
phpmyadmin:
  image: phpmyadmin/phpmyadmin
  restart: always
  ports:
    - 8080:80
  environment:
    PMA_HOST: db
    PMA_USER: wordpress
    PMA_PASSWORD: wordpress
```

## サンプル

- [hbsnow-sandbox/wordpress-docker](https://github.com/hbsnow-sandbox/wordpress-docker)
