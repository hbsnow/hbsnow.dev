---
title: JSON-LD による構造化データ
tags: AMP
description: JSON-LD による構造化データの記述方法についての解説。
datePublished: 2017-12-01
---

JSON-LD とは、[Linked Data](https://www.w3.org/DesignIssues/LinkedData.html) を JSON で記述するための軽量シンタックスです。Google は構造化データを、この [JSON-LD で記述することを推奨](https://developers.google.com/search/docs/guides/intro-structured-data#structured-data-format)しています。

## JSON-LD の keywords

JSON-LD にはいくつかの keyword がありますが、ここで紹介しているのは AMP で必要になる keyword のみに限定しています。その他の keyword については[最新の JSON-LD の SPEC](https://json-ld.org/spec/latest/json-ld/#syntax-tokens-and-keywords) で確認してください。

### @context

`@context` は JSON-LD 全体で使用される省略名を定義するために使用します。

例えば、下記の JSON-LD は同じ長い文字列が繰り返し出現しています。

```json
{
  "http://schema.org/name": "Jhon Doe",
  "@type": "http://schema.org/Person"
}
```

これは `@context` を使用することで、シンプルに記述することができます。

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

ここでの `name` や `Person` は term と呼ばれ、識別子を短い記法で表現することができるようになります。

また、次のように記述することもできます。

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

この例のように term の定義が一つであれば、`@vocab` を使用さらに簡略化して書くこともできます。

```json
{
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "Jhon Doe"
}
```

逆に複雑であれば、これらの定義を外部ファイルにすることもできます。

```json
{
  "@context": "http://example.org/contexts/person.jsonld",
  "@type": "Person",
  "name": "Jhon Doe"
}
```

```person.jsonld
{
  "@vocab": "http://schema.org/"
}
```

#### @type

node あるいは typed value の型を指定するときに使用します。

node 型は人物や場所、イベント、Web ページなどの記述されているものの型を指定し、typed value 型は整数、浮動小数点数、または日付など、特定の値のデータ型を指定します。

#### @id

IRI や blank node identifier (`_:` ではじまる文字列) を用いて一意に識別するために使用します。

先ほどの例では Jhon Doe という人物が複数いた場合、それがどの Jhon Doe なのかがわかりません。

```json
{
  "@context": "http://schema.org",
  "@type": "Person",
  "@id": "https://example.org/jhon_doe",
  "name": "Jhon Doe"
}
```

この例ではサイトの URL を追加することで、人物を一意に特定しています。

## AMP で使用する場合のサンプル

AMP で JSON-LD を使用する場合には、いくつかの記述が必須となる項目があり、それらは公式の [Google Search のドキュメント](https://developers.google.com/search/docs/guides/)で確認することができます。

### ブログ記事

```json
{
  "@context": "http://schema.org",
  "@type": "http://schema.org/BlogPosting",
  "mainEntityOfPage": {
    "@type":"WebPage",
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

`image` には以下の条件があります。

| 内容     | 制限          |
| -------- | ------------- |
| 幅       | 696px 以上    |
| 画像形式 | jpg, gif, png |

また最良の結果を得るためには `width * height` の結果が `300000` 以下となる、縦横比 `16:9, 4:3, 1:1` の複数の高解像度画像を複数用意する必要があります。

`publisher` は `Organization` しか指定できません。よって個人ブログのような場合には `name` にサイト名、`logo` にはバナーなどを入れるしかないように思えます。

`logo` にも、 `image` と同じように条件があります。

| 内容     | 制限                 |
| -------- | -------------------- |
| 幅       | 600px 以下           |
| 高さ     | 60px 以下            |
| 画像形式 | jpg, gif, png        |
| 背景色   | 白、あるいは明るい色 |

また、ここに指定される画像はワードマークやロゴであって、アイコンではないことに注意が必要です。

`mainEntityOfPage`, `dateModified`, `description` は `recommended` であり必須ではありません。

## バリデーション

[Google 構造化テストツール](https://search.google.com/structured-data/testing-tool) では実際にサイトで利用するときにエラーがないかの確認をすることができます。

## 参考

- [JSON-LD 1.1](https://json-ld.org/spec/latest/json-ld/)
- [Introduction to Structured Data | Search | Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
- [Article | Search | Google Developers](https://developers.google.com/search/docs/data-types/article)
