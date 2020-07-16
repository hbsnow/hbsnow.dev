---
title: WP-CLI をハンズオン形式で学ぶ
tags: [wordpress]
description: WordPress の CLI である WP-CLI をハンズオン形式で学ぶ。
createdAt: 2020-07-16
---

** WIP **

## まとめ

- [WP-CLI Commands](https://developer.wordpress.org/cli/commands/)
- テーマ・カスタム投稿・カスタムタクソノミーの Scaffolding が便利

## インストールして日本語化する

以降の作業は [以前作成した環境](/blog/wordpress-docker/) にて、コンテナ内で作業していることを想定していいます。その場合、`--allow-root` が必要になるため、適宜追加してください。

```
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

上記でインストールから日本語化までの手順になります。ここまでは WP-CLI で実行するよりも、`init.sql` で流すことが多いです。あるいは `wp db export` したものを `wp db import` するのもよさそうです。

- [wp core install](https://developer.wordpress.org/cli/commands/core/install/)
- [wp core update](https://developer.wordpress.org/cli/commands/core/update/)
- [wp language core install](https://developer.wordpress.org/cli/commands/language/core/install/)
- [wp plugin install](https://developer.wordpress.org/cli/commands/plugin/install/)
- [wp option update](https://developer.wordpress.org/cli/commands/option/update/)

## Scaffolding

### テーマ

[\_s](https://github.com/automattic/_s) というの WordPress 用のスターターテーマ。

```
# _s のベーステーマを生成
wp scaffold _s <theme-slug>

# 作成したテーマを有効化
wp theme activate <theme-slug>
```

- [wp scaffold \_s](https://developer.wordpress.org/cli/commands/scaffold/_s/)
- [wp theme activate](https://developer.wordpress.org/cli/commands/theme/activate/)

### カスタム投稿タイプ

```
# カスタム投稿タイプを追加
wp scaffold post-type <post-types> --theme=<theme-slug> --label="カスタム投稿サンプル"

# rewrite rules をリセット
wp rewrite flush
```

テーマ名を指定すると標準出力ではなく、指定テーマの `post-types` にファイルが生成されます。このコマンドはファイルを生成するだけであるため、実行するためには `functions.php` に以下のようなコードを記述する必要があります。

```php
require get_template_directory() . '/post-types/<post-types>.php';
```

- [wp scaffold post-type](https://developer.wordpress.org/cli/commands/scaffold/post-type/)

### カスタムタクソノミータイプ

```
# カスタム投稿タイプを追加
wp scaffold <taxonomy-slug> --post_types=<post-types> --theme=<theme-slug> --label="カスタムタクソノミーサンプル"
```

テーマ名を指定すると標準出力ではなく、指定テーマの `taxonomies` にファイルが生成されます。このコマンドはファイルを生成するだけであるため、実行するためには `functions.php` に以下のようなコードを記述する必要があります。

```php
require get_template_directory() . '/taxonomies/<taxonomy-slug>.php';
```

- [wp scaffold taxonomy](https://developer.wordpress.org/cli/commands/scaffold/taxonomy/)

## メンテナンスモード

```
# メンテナンスモードを有効にする
wp maintenance-mode activate

# メンテナンスモードを無効にする
wp maintenance-mode deactivate
```

ただし生成されるファイルには `<?php $upgrading = 1594870466; ?>` のように現在のタイムスタンプが設定され、設定から 10 分で自動的に解除されます。ただ、この方法だとメンテナンスモード時のデザイン変更ができそうにないので、利用する機会は少なそう。

- [wp maintenance-mode activate](https://developer.wordpress.org/cli/commands/maintenance-mode/activate/)
- [wp maintenance-mode deactivate](https://developer.wordpress.org/cli/commands/maintenance-mode/deactivate/)
