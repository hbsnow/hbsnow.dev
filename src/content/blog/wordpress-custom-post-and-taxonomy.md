---
layout: "@/layouts/BlogPostLayout.astro"
title: WordPress のカスタム投稿とカスタムタクソノミー、カスタムフィールドを作成する
tags: [wordpress]
description: WordPress のカスタム投稿とカスタムタクソノミー、カスタムフィールドを作成する。
createdAt: 2020-07-27
updatedAt: 2020-08-08
---

## まとめ

- カスタム投稿とカスタムタクソノミーは [WP-CLI](https://wp-cli.org/) で作成する
- カスタムフィールドには [ACF](https://www.advancedcustomfields.com/) を使う

## カスタム投稿を作る

example というテーマに Item (商品) というカスタム投稿を追加します。

```sh
wp scaffold post-type item --theme=example --label="Item"
```

`functions.php` に `require get_template_directory() . '/post-types/item.php';` を追加するとカスタム投稿タイプが追加されます。

| `$args`                 | description                                                                                                                                                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `labels`                | ラベルの配列。                                                                                                                                                                                                                               |
| `public`                | `false` にするとメインループの対象ページが非公開になる。上記の例では `/item/` になる。初期値は `true`                                                                                                                                        |
| `hierarchical`          | `true` にする場合、 `supports` に `page-attributes` を追加しないと管理画面で表示されない。初期値は `false`                                                                                                                                   |
| `show_ui`               | `false` にすると管理画面から表示が消える。初期値は `true`                                                                                                                                                                                    |
| `show_in_nav_menus`     | `false` にするとテーマ編集のメニューにある項目追加から選択できなくなる。初期値は `true`                                                                                                                                                      |
| `supports`              | `'title', 'editor', 'comments', 'revisions', 'trackbacks', 'author', 'excerpt', 'page-attributes', 'thumbnail', 'custom-fields', 'post-formats'` から選択する。ここで選んだものが管理画面で表示される。初期値は `array( 'title', 'editor' )` |
| `has_archive`           | アーカイブページを持たせなくていい場合には `false` にする。初期値は `true`                                                                                                                                                                   |
| `rewrite`               | rewrite rule を書き換える。配列で設定が可能で、`slug` を `foo/bar` のようにすることで擬似的に階層の子のような URL を表現できる。初期値は `true`                                                                                              |
| `query_var`             | `true` にすると `?{query_var}={post_slug}` で表示されなくなる。初期値は `true`                                                                                                                                                               |
| `menu_position`         | 管理画面のメニューの位置を変更する。初期値は `null`                                                                                                                                                                                          |
| `menu_icon`             | メニューに使用されるアイコン。初期値は `'dashicons-admin-post'`                                                                                                                                                                              |
| `show_in_rest`          | REST API で公開するかどうか。Gutenberg であれば true にする必要がある。初期値は `true`                                                                                                                                                       |
| `rest_base`             | REST API で使用される slug。初期値は `<pot-type>`                                                                                                                                                                                            |
| `rest_controller_class` | REST API コントローラーのクラス名。初期値は `'WP_REST_Posts_Controller'`                                                                                                                                                                     |

すべての設定は次のリンク先に記載されています。

- [register_post_type()](https://developer.wordpress.org/reference/functions/register_post_type/)

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

- [register_post_type()](https://developer.wordpress.org/reference/functions/register_post_type/)
- [add_rewrite_rule()](https://developer.wordpress.org/reference/functions/add_rewrite_rule/)

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

### 検索語句と AND 検索で検索可能にする

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

管理者ページと、メインクエリ以外のページでは不要な処理なので早期リターン。あとは検索時でありかつ商品のカスタム投稿ページのときにのみ、クエリを追加しています。

```php
add_action(
	'pre_get_posts',
	function ( $query ) {
		if ( is_admin() || ! $query->is_main_query() ) {
			return;
		}

		$meta_query = array();

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
- [WP_Query](https://developer.wordpress.org/reference/classes/wp_query/)
- [WP_Query::set](https://developer.wordpress.org/reference/classes/wp_query/set/)

### 検索語句と OR 検索で検索可能にする

OR 検索の条件がつくと `WP_Query::set` では難しくなります。例えば `検索語句` を検索したときには次のような SQL が叩かれます。

```sql
SELECT SQL_CALC_FOUND_ROWS  wp_posts.ID FROM wp_posts
  WHERE 1=1
    AND (((wp_posts.post_title LIKE '%検索語句%')
    OR (wp_posts.post_excerpt LIKE '%検索語句%')
    OR (wp_posts.post_content LIKE '%検索語句%')))
    -- ここでカスタムフィールドを OR 検索したい
    AND wp_posts.post_type = 'item'
    AND (wp_posts.post_status = 'publish' OR wp_posts.post_status = 'acf-disabled' OR wp_posts.post_status = 'private')
  ORDER BY wp_posts.post_title LIKE '%検索語句%' DESC, wp_posts.post_date DESC
  LIMIT 0, 10
```

先ほどの AND 検索の方法では、次のような SQL が叩かれることになります。

```sql
SELECT SQL_CALC_FOUND_ROWS  wp_posts.ID FROM wp_posts
  INNER JOIN wp_postmeta ON ( wp_posts.ID = wp_postmeta.post_id )
  WHERE 1=1
  AND (((wp_posts.post_title LIKE '%検索語句%')
  OR (wp_posts.post_excerpt LIKE '%検索語句%')
  OR (wp_posts.post_content LIKE '%検索語句%')))
  -- ここで AND 検索してしまう
  AND (
    ( wp_postmeta.meta_key = 'info' AND wp_postmeta.meta_value LIKE '%検索語句%' )
  )
  AND wp_posts.post_type = 'item'
  AND (wp_posts.post_status = 'publish' OR wp_posts.post_status = 'acf-disabled' OR wp_posts.post_status = 'private')
  GROUP BY wp_posts.ID
  ORDER BY wp_posts.post_title LIKE '%検索語句%' DESC, wp_posts.post_date DESC
  LIMIT 0, 10
```

そのため、`posts_where` と `posts_join` を使って直接 SQL を書き換える必要があります。

```php
add_filter(
	'posts_where',
	function ( $where ) {
		global $wp_query, $wpdb;

		if ( is_admin() || ! $wp_query->is_main_query() ) {
			return $where;
		}

		if ( $wp_query->is_post_type_archive( 'item' ) && $wp_query->query_vars['s'] ) {
			$where = preg_replace(
				"/\(\s*{$wpdb->posts}.post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
				"({$wpdb->posts}.post_title LIKE $1) OR ({$wpdb->postmeta}.meta_key='<key>' AND {$wpdb->postmeta}.meta_value LIKE $1)",
				$where
			);
		}

		return $where;
	}
);

add_filter(
	'posts_join',
	function ( $join ) {
		global $wp_query, $wpdb;

		if ( is_admin() || ! $wp_query->is_main_query() ) {
			return $join;
		}

		if ( $wp_query->is_post_type_archive( 'item' ) && $wp_query->query_vars['s'] ) {
			$join .= "LEFT JOIN $wpdb->postmeta ON $wpdb->posts.ID = $wpdb->postmeta.post_id ";
		}

		return $join;
	}
);
```

上記のコードは [Search WordPress by Custom Fields without a Plugin](https://adambalee.com/search-wordpress-by-custom-fields-without-a-plugin/) を参考にしています。

これによって次のように SQL が書き換わります。

```sql
SELECT SQL_CALC_FOUND_ROWS  wp_posts.ID FROM wp_posts
  LEFT JOIN wp_postmeta ON wp_posts.ID = wp_postmeta.post_id
  WHERE 1=1
    AND (((wp_posts.post_title LIKE '%検索語句%') OR (wp_postmeta.meta_key = '<key>' AND wp_postmeta.meta_value LIKE '%検索語句%') OR (wp_posts.post_excerpt LIKE '%検索語句%') OR (wp_posts.post_content LIKE '%検索語句%')))
    AND wp_posts.post_type = 'item'
    AND (wp_posts.post_status = 'publish' OR wp_posts.post_status = 'acf-disabled' OR wp_posts.post_status = 'private')
    ORDER BY wp_posts.post_title LIKE '%検索語句%' DESC, wp_posts.post_date DESC
    LIMIT 0, 10
```

- [posts_where](https://developer.wordpress.org/reference/hooks/posts_where/)
- [posts_join](https://developer.wordpress.org/reference/hooks/posts_join/)
