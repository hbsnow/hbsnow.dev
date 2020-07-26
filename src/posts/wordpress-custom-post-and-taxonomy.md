---
title: WordPress のカスタム投稿とカスタムタクソノミーを作成する
tags: [wordpress]
description: WordPress のカスタム投稿とカスタムタクソノミーを作成する。
createdAt: 2020-07-27
---

** WIP **

## まとめ

- カスタム投稿とカスタムタクソノミーは WP-CLI で作成する
- カスタムフィールドには [ACF](https://www.advancedcustomfields.com/) を使う

## カスタム投稿を作る

example というテーマに Item (商品) というカスタム投稿を追加します。

```sh
wp scaffold post-type item --theme=example --label="Item"
```

`functions.php` に `require get_template_directory() . '/post-types/item.php';` を追加するとカスタム投稿タイプが追加されます。

- [register_post_type()](https://developer.wordpress.org/reference/functions/register_post_type/)

すべての設定は上記のリンク先に記載されています。

| `$args`                 | 設定される値                 | description                                                                                                                                                                                             |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `labels`                | 多いので略                   | ラベルの配列。                                                                                                                                                                                          |
| `public`                | `true`                       | `false` にするとメインループの対象ページが非公開になる。上記の例では `/item/` になる。                                                                                                                  |
| `hierarchical`          | `false`                      | `true` にする場合、 `supports` に `page-attributes` を追加しないと管理画面で表示されない。                                                                                                              |
| `show_ui`               | `true`                       | `false` にすると管理画面から表示が消える。                                                                                                                                                              |
| `show_in_nav_menus`     | `true`                       | `false` にするとテーマ編集のメニューにある項目追加から選択できなくなる。                                                                                                                                |
| `supports`              | `array( 'title', 'editor' )` | `'title', 'editor', 'comments', 'revisions', 'trackbacks', 'author', 'excerpt', 'page-attributes', 'thumbnail', 'custom-fields', 'post-formats'` から選択する。ここで選んだものが管理画面で表示される。 |
| `has_archive`           | `true`                       | アーカイブページを持たせなくていい場合には `false` にする。                                                                                                                                             |
| `rewrite`               | `true`                       | rewrite rule を書き換える。配列で設定が可能で、`slug` を `foo/bar` のようにすることで擬似的に階層の子のような URL を表現できる。                                                                        |
| `query_var`             | `true`                       | `true` にすると `?{query_var}={post_slug}` で表示されなくなる。                                                                                                                                         |
| `menu_position`         | `null`                       | 管理画面のメニューの位置を変更する。                                                                                                                                                                    |
| `menu_icon`             | `'dashicons-admin-post'`     | メニューに使用されるアイコン。                                                                                                                                                                          |
| `show_in_rest`          | `true`                       | REST API で公開するかどうか。Gutenberg であれば true にする必要がある。                                                                                                                                 |
| `rest_base`             | `<pot-type>`                 | REST API で使用される slug。                                                                                                                                                                            |
| `rest_controller_class` | `'WP_REST_Posts_Controller'` | REST API コントローラーのクラス名。                                                                                                                                                                     |

### 管理画面のメニューの位置を変更する

作成したカスタム投稿を管理メニューの表示位置で投稿の下にしたい場合、単純に `menu_position` を `5` にするだけです。ただし、カスタム投稿タイプの数が増えてくると「メディア」が途中に挟まってしまいます。

```php
// あまり良くない例
add_action(
	'admin_menu',
	function () {
		global $menu;
		// phpcs:ignore
		$menu[14] = $menu[10];
		unset( $menu[10] );
	}
);
```

global の `$menu` を直接変更するような方法は Lint でも警告が出るとおりで、これは良い方法ではありません。`menu_order` で表示順の変更ができます。

```php
add_filter('custom_menu_order', '__return_true');
add_filter(
	'menu_order',
	function ($menu_ord) {
		if (!$menu_ord) return true;

		return array(
			'index.php',
			'separator1',
			'edit.php',
			'edit.php?post_type=<post-type>',
			'separator-last',
			'upload.php',
		);
	}
);
```

- [custom_menu_order](https://developer.wordpress.org/reference/hooks/custom_menu_order/)
- [menu_order](https://developer.wordpress.org/reference/hooks/menu_order/)

## カスタムタクソノミーを作る

カスタムタクソノミーを Item Category というカスタムタクソノミーを追加します。

```sh
wp scaffold taxonomy item-category --post_types=items --theme=example --label="Item Category"
```
