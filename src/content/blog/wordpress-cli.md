---
title: WP-CLI まとめ
tags: [wordpress]
description: WordPress の CLI である WP-CLI の使いそうな機能をまとめました。
createdAt: 2020-07-16
updatedAt: 2020-07-22
---

## まとめ

- [WP-CLI Commands](https://developer.wordpress.org/cli/commands/)
- テーマ・カスタム投稿・カスタムタクソノミー作成には `scaffold`
- サイトの移転には `search-replace`
- パフォーマンス計測には `profile`

## インストールして日本語化する

以降の作業は [以前作成した環境](/blog/wordpress-docker/) にて、コンテナ内で作業していることを想定していいます。その場合、`--allow-root` が必要になるため、適宜追加してください。

```sh
# インストール
wp core install --url=localhost:8000 --title=Example --admin_user=admin --admin_password=password --admin_email=admin@example.com

# アップデート
wp core update

# 日本語をインストールして有効化
wp language core install ja --activate

# プラグイン wp-multibyte-patch をインストールして有効化
wp plugin install wp-multibyte-patch --activate

# タイムゾーンの設定を Asia/Tokyo に変更
wp option update timezone_string Asia/Tokyo
```

上記でインストールから日本語化までの手順になります。ここまではWP-CLIで実行するよりも、`init.sql` で流すことが多いです。あるいは `wp db export` したものを `wp db import` するのもよさそうです。

- [wp core install](https://developer.wordpress.org/cli/commands/core/install/)
- [wp core update](https://developer.wordpress.org/cli/commands/core/update/)
- [wp language core install](https://developer.wordpress.org/cli/commands/language/core/install/)
- [wp plugin install](https://developer.wordpress.org/cli/commands/plugin/install/)
- [wp option update](https://developer.wordpress.org/cli/commands/option/update/)

## Scaffolding

### テーマ

[\_s](https://github.com/automattic/_s) というのWordPress用のスターターテーマ。

```sh
# _s のベーステーマを生成
wp scaffold _s <theme-slug>

# 作成したテーマを有効化
wp theme activate <theme-slug>

# _s の SASS を使ったベーステーマを名前をつけて生成して有効化
wp scaffold _s <theme-slug> --theme_name="テーマサンプル" --sassify --activate
```

- [wp scaffold \_s](https://developer.wordpress.org/cli/commands/scaffold/_s/)
- [wp theme activate](https://developer.wordpress.org/cli/commands/theme/activate/)

### カスタム投稿タイプ

```sh
# カスタム投稿タイプを追加
wp scaffold post-type <post-types> --theme=<theme-slug> --label="カスタム投稿サンプル"

# rewrite rules をリセット
wp rewrite flush

# 投稿タイプの一覧表示
wp post-type list
```

テーマ名を指定すると標準出力ではなく、指定テーマの `post-types` にファイルが生成されます。このコマンドはファイルを生成するだけであるため、実行するためには `functions.php` に次のようなコードを記述する必要があります。

```php
require get_template_directory() . '/post-types/<post-types>.php';
```

そのまま使用すると日本語の場合であっても、複数形のsがついてしまうので修正が必要になります。

- [wp scaffold post-type](https://developer.wordpress.org/cli/commands/scaffold/post-type/)

### カスタムタクソノミー

```sh
# カスタムタクソノミーを追加
wp scaffold taxonomy <taxonomy-slug> --post_types=<post-types> --theme=<theme-slug> --label="カスタムタクソノミーサンプル"

# タクソノミーの一覧表示
wp taxonomy list

# タームの追加
wp term create <taxonomy-slug> <term> --slug=<term-slug> --description=<description>

# タームの一覧表示
wp term list <taxonomy-slug>
```

scaffoldはテーマ名を指定すると標準出力ではなく、指定テーマの `taxonomies` にファイルが生成されます。このコマンドはファイルを生成するだけであるため、実行するためには `functions.php` に次のようなコードを記述する必要があります。

```php
require get_template_directory() . '/taxonomies/<taxonomy-slug>.php';
```

- [wp scaffold taxonomy](https://developer.wordpress.org/cli/commands/scaffold/taxonomy/)
- [wp term create](https://developer.wordpress.org/cli/commands/term/create/)
- [wp term list](https://developer.wordpress.org/cli/commands/term/list/)

## データベース

```sh
# データの置換
wp search-replace <old> <new>

# 置換されたデータをエクスポート
wp search-replace <old> <new> --export=db.sql

# エクスポート
wp db export

# インポート
wp db import
```

WordPressのDBではデータがシリアライズされている可能性があるため、単純な置換ができません。例えば移転などでURLに変更を加える必要がある場合、`wp search-replace` によって置き換えることができます。

- [wp search-replace](https://developer.wordpress.org/cli/commands/search-replace/)
- [wp db export](https://developer.wordpress.org/cli/commands/db/export/)
- [wp db import](https://developer.wordpress.org/cli/commands/db/import/)

## i18n

```sh
# POT の生成
wp i18n make-pot . <pot>

# PO から翻訳に必要な JSON をエクスポート
wp i18n make-json <po>
```

- [wp i18n make-pot](https://developer.wordpress.org/cli/commands/i18n/make-pot/)
- [wp i18n make-json](https://developer.wordpress.org/cli/commands/i18n/make-json/)

## パフォーマンス計測

```sh
# パッケージのインストール
wp package install wp-cli/profile-command

# bootstrap, main_query, template で計測
wp profile stage

# bootstrap の詳細を計測
wp profile stage bootstrap

# bootstrap にある hook の init を計測
wp profile hook init
```

デフォルトではインストールされていないため、パッケージのインストールが必要になります。

- [wp package install](https://developer.wordpress.org/cli/commands/package/install/)
- [wp profile stage](https://developer.wordpress.org/cli/commands/profile/stage/)
- [wp profile hook](https://developer.wordpress.org/cli/commands/profile/hook/)

## メンテナンスモード

```sh
# メンテナンスモードを有効にする
wp maintenance-mode activate

# メンテナンスモードを無効にする
wp maintenance-mode deactivate
```

生成されるファイルは `<?php $upgrading = 1594870466; ?>` のように現在のタイムスタンプが設定するだけです。そのためコマンド実行から10分でメンテナンスモードは自動的に解除されます。

この方法だとメンテナンスモード時のデザイン変更ができそうにないので、利用する機会は少なそうです。

- [wp maintenance-mode activate](https://developer.wordpress.org/cli/commands/maintenance-mode/activate/)
- [wp maintenance-mode deactivate](https://developer.wordpress.org/cli/commands/maintenance-mode/deactivate/)
