---
title: Docker による Wordpress のローカル開発環境構築
tags: [wordpress, docker]
description: Docker で Wordpress のローカル開発環境を構築する。
createdAt: 2018-05-11
updatedAt: 2019-10-02
---

ここには Docker のインストールなどのごく初歩的な解説はありません。また、Wordpress の環境構築には Docker の他に [VCCW](https://github.com/vccw-team/vccw) という Vagrant を使用する Starter もよく知られているようですが、私自身は使用したことがないので、これらツールの比較についてはこのページで言及していません。

また、[Laradock](https://laradock.io/) でも Wordpress をサポートしているようなので、そちらを試してみるのもいいかもしれません。

## とりあえず動かす

[Quick Start](https://docs.docker.com/compose/wordpress/) を参考に、起動するまで手順を進めます。日本語の翻訳もありますが、内容がかなり古いこともあるので英語版がおすすめです。

動かすまでの手順としては `docker-compose.yml` をコピーし、`docker-compose up -d` を入力するだけになります。`docker-compose help up` で調べることができますが、`-d` は detached mode、バックグラウンドで実行していることを意味しています。

終了したい場合には、`docker-compose down` を入力してください。データベースの削除をしたい場合には `docker-compose down --volumes` とオプションをつけます。

## ファイルの永続化

とりあえず動作させて、ちょっとした確認だけを行うだけであれば上記の `docker-compose.yml` でさほど困ることはありませんが、起動のたびに `wp-content` 内のデータが消えるのは開発環境として好ましいくないことも多いので、該当のディレクトリを永続化させます。

[volumes](https://docs.docker.com/compose/compose-file/#volumes) の項目を参考に、ホストとコンテナをマッピングします。

```docker.yml
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

```docker.yml
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
