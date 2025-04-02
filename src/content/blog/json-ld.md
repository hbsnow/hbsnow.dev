---
title: JSON-LD による構造化データ
tags: [amp]
description: JSON-LD による構造化データの記述方法についての解説。
createdAt: 2017-12-01
updatedAt: 2020-04-17
---

JSON-LDとは、[Linked Data](https://www.w3.org/DesignIssues/LinkedData.html) をJSONで記述するための軽量シンタックスです。Googleは構造化データを、 [JSON-LD での記述を推奨](https://developers.google.com/search/docs/guides/intro-structured-data#structured-data-format)しています。

## JSON-LD の keywords

JSON-LDにはいくつかのkeywordがありますが、ここで紹介しているのはAMPで必要になるkeywordのみに限定しています。その他のkeywordについては[JSON-LD の SPEC](https://json-ld.org/spec/latest/json-ld/#syntax-tokens-and-keywords) にて確認できます。

### @context

`@context` はJSON-LD全体で使用される省略名を定義するために使用します。

例えば、次のJSON-LDは同じ長い文字列が繰り返し出現しています。

```json
{
  "http://schema.org/name": "Jhon Doe",
  "@type": "http://schema.org/Person"
}
```

これは `@context` を使用することで、シンプルに記述できます。

```json
{
  "@context": {
    "name": "http://schema.org/name",
    "Person": "http://schema.org/Person"
  },
  "@type": "Person",
  "name": "Jhon Doe"
}
```

ここでの `name` や `Person` はtermと呼ばれ、識別子を短い記法で表現できるようになります。

また、次のように記述できます。

```json
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@type": "schema:Person",
  "schema:name": "Jhon Doe"
}
```

```json
{
  "@context": {
    "@vocab": "http://schema.org/"
  },
  "@type": "Person",
  "name": "Jhon Doe"
}
```

この例のようにtermの定義が1つであれば、`@vocab` を使用さらに簡略化して書くこともできます。

```json
{
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "Jhon Doe"
}
```

逆に複雑であれば、これらの定義を外部ファイルにできます。

```json
{
  "@context": "http://example.org/contexts/person.jsonld",
  "@type": "Person",
  "name": "Jhon Doe"
}
```

```json
{
  "@vocab": "http://schema.org/"
}
```

#### @type

nodeあるいはtyped valueの型を指定するときに使用します。

node型は人物や場所、イベント、Webページなどの記述されているものの型を指定し、typed value型は整数や浮動小数点数、または日付など特定の値のデータ型を指定します。

#### @id

IRIやblank node identifier (`_:` ではじまる文字列) を用いて一意に識別するために使用します。

先ほどの例ではJhon Doeという人物が複数いた場合、それがどのJhon Doeなのかがわかりません。

```json
{
  "@context": "http://schema.org",
  "@type": "Person",
  "@id": "https://example.org/jhon_doe",
  "name": "Jhon Doe"
}
```

この例ではサイトのURLを追加することで、人物を一意に特定しています。

## AMP で使用する場合のサンプル

AMPでJSON-LDを使用する場合には、いくつかの記述が必須となる項目があり、[構造化データの記事](https://developers.google.com/search/docs/data-types/article)で確認できます。

### ブログ記事

```json
{
  "@context": "http://schema.org",
  "@type": "http://schema.org/BlogPosting",
  "mainEntityOfPage": {
    "@type":"BlogPosting",
    "@id":"https://example.com/blog/"
  },
  "headline": "サンプル",
  "image": [
    "https://example.com/blog/example/assets/image@1x1.png",
    "https://example.com/blog/example/assets/image@4x3.png",
    "https://example.com/blog/example/assets/image@16x9.png"
  ],
  "publisher": {
     "@type": "Organization",
     "name": "My Sample Website",
     "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/assets/logo.png",
      "height": 60,
      "width": 600
    }
  },
  "datePublished": "2017-11-12",
  "dateModified": "2017-11-21",
  "author": "Jhon Doe",
  "description": "サンプルページです。"
  }
}
```

`image` には次の条件があります。

| 内容     | 制限          |
| -------- | ------------- |
| 幅       | 1200px 以上   |
| 画像形式 | jpg, gif, png |

また最良の結果を得るためには `width * height` の結果が `800000` 以下となる、縦横比 `16:9, 4:3, 1:1` の複数の高解像度画像を複数用意する必要があります。

`publisher` は `Organization` しか指定できません。よって個人ブログのような場合には `name` にサイト名、`logo` にはバナーなどを入れるしかないように思えます。

`logo` にも、 `image` と同じように条件があります。

| 内容     | 制限                 |
| -------- | -------------------- |
| 幅       | 600px 以下           |
| 高さ     | 60px 以下            |
| 画像形式 | jpg, gif, png        |
| 背景色   | 白、あるいは明るい色 |

また、ここに指定される画像は文字商標やロゴであって、アイコンではないことに注意が必要です。

`mainEntityOfPage`, `dateModified`, `description` は `recommended` であり必須になっていません。

## バリデーション

[Google 構造化テストツール](https://search.google.com/structured-data/testing-tool) では実際にサイトで利用するときにエラーがないかの確認をできます。

## 参考

- [JSON-LD 1.1](https://json-ld.org/spec/latest/json-ld/)
- [Introduction to Structured Data | Search | Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
- [Article | Search | Google Developers](https://developers.google.com/search/docs/data-types/article)
