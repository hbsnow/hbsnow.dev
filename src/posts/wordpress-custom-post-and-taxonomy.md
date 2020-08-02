---
title: WordPress のカスタム投稿とカスタムタクソノミー、カスタムフィールドを作成する
tags: [wordpress]
description: WordPress のカスタム投稿とカスタムタクソノミー、カスタムフィールドを作成する。
createdAt: 2020-07-27
updatedAt: 2020-08-02
---

** WIP **

## まとめ

- カスタム投稿とカスタムタクソノミーは [WP-CLI](https://wp-cli.org/) で作成する
- カスタムフィールドには [ACF](https://www.advancedcustomfields.com/) を使う

## カスタム投稿を作る

example というテーマに Item (商品) というカスタム投稿を追加します。

```sh
wp scaffold post-type item --theme=example --label="Item"
```

`functions.php` に `require get_template_directory() . '/post-types/item.php';` を追加するとカスタム投稿タイプが追加されます。

- [register_post_type](https://developer.wordpress.org/reference/functions/register_post_type/)

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

作成したカスタム投稿を管理メニューの表示位置で投稿の下にしたい場合、単純に `menu_position` を `5` にするだけです。

ただし、カスタム投稿タイプの数が増えてくると「メディア」が途中に挟まってしまいます。管理画面のメニューの順序は `menu_order` で変更が可能で、このとき `menu_position` を変更する必要はありません。

```php
add_filter( 'custom_menu_order', '__return_true' );
add_filter(
	'menu_order',
	function ( $menu_ord ) {
		if ( ! $menu_ord ) {
			return true;
		}

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

## URL の変更をする

`register_post_type` の第二引数に `'rewrite' => array( 'slug' => '<slug>' ),` を追加するだけです。

階層を持たせたいときには `foo/bar` のように `/` を含めて記述します。設定変更後に `wp rewrite flush` でキャッシュを削除する必要があるので注意が必要です。

カスタム投稿アーカイブ > カスタム投稿ポスト > 固定ページがデフォルトの表示優先順になります。細かい優先順については `wp rewrite list` で確認でき、変更が必要な場合には `add_rewrite_rule` で変更できます。

- [register_post_type](https://developer.wordpress.org/reference/functions/register_post_type/)
- [add_rewrite_rule](https://developer.wordpress.org/reference/functions/add_rewrite_rule/)

## カスタムタクソノミーを作る

カスタムタクソノミーを Item Category というカスタムタクソノミーを追加します。

```sh
wp scaffold taxonomy item-category --post_types=item --theme=example --label="Item Category"
```

`functions.php` に `require get_template_directory() . '/taxonomies/item.php';` を追加するとカスタム投稿タイプが追加されます。

## カスタムフィールド

カスタムフィールドを作るのは非常に手間なので、カスタムフィールドを使う場合には [ACF](https://www.advancedcustomfields.com/) を使うべきです。

```sh
wp plugin install advanced-custom-fields --activate
```

### カスタムフィールドで追加した項目を検索可能にする

商品に価格のカスタムフィールドを追加して、その範囲でメインクエリの検索ができるようにしてみます。デフォルトではカスタムフィールドは検索対象とならないため、検索対象に加える場合にはひと手間必要になります。

まずは管理画面のカスタムフィールドから、ラベルに価格である `price` を作成します。

検索用のクエリを有効化するため、`query_vars` にそれぞれ追加します。

```php
add_filter(
	'query_vars',
	function ( $public_query_vars ) {
		$public_query_vars[] = 'minPrice';
		$public_query_vars[] = 'maxPrice';

		return $public_query_vars;
	}
);
```

```php
add_action(
	'pre_get_posts',
	function ( $query ) {
		if ( is_admin() || ! $query->is_main_query() ) {
			return;
		}

		if ( $query->is_search && $query->is_post_type_archive( 'item' ) ) {
			$min_price = $query->query_vars['minPrice'];
			$max_price = $query->query_vars['maxPrice'];

			if ( $min_price ) {
				$meta_query[] = array(
					'key'     => 'price',
					'value'   => $min_price,
					'type'    => 'numeric',
					'compare' => '>=',
				);
			}

			if ( $max_price ) {
				$meta_query[] = array(
					'key'     => 'price',
					'value'   => $max_price,
					'type'    => 'numeric',
					'compare' => '<=',
				);
			}
		}
		$query->set( 'meta_query', $meta_query );
	}
);
```

- [query_vars](https://developer.wordpress.org/reference/hooks/query_vars/)
- [pre_get_posts](https://developer.wordpress.org/reference/hooks/pre_get_posts/)
