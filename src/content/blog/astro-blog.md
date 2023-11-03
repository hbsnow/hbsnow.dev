---
layout: "@/layouts/BlogPostLayout.astro"
title: Astro と React のコンポーネントでブログを作り直した
tags: [astro, react]
description: Next.js で SSG していたブログを Astro を使って作り直しました。
createdAt: 2022-09-03
---

[クラスメソッドに入社して以来 DeveloperIO にブログを書くようになった](https://dev.classmethod.jp/author/takahashi-yuki/)ため、このブログに記事を書くことがなくなりましたが、最近 [Astro が 1.0 になった](https://astro.build/blog/astro-1/)ので作り直してみることにしました。

またこの記事はAstroの機能を網羅的に紹介するものではなく、作成時において気になった点を記録しておくものです。そのためAstroがどういったものかを知るために、まずは[公式のドキュメント](https://astro.build/)を参照ください。

## 前提

もともとは [Metalsmith](https://metalsmith.io/) で作成していたものを、[Next.js が SSG に対応したとき](/blog/nextjs-blog-ssg)書き換えたものでした。

そのため記事のデータはWebのAPIで取得するようなものではなく、ローカルのMarkdownのファイルからビルドするという形をとっています。それをNext.jsでやろうとすると、意外と自分で結構な量のコードを書かないといけないのでメンテナンスが面倒です。

Astroであれば、`page` ディレクトリ内に `.md` または `.mdx` ファイルを置くだけで自動的にページのルートが構築されるため、これがもっとも大きな移行動機になります。

[ドキュメントを見ながら](https://docs.astro.build/en/getting-started/)進めれば困ることはありません。今回はpnpmを使いましたが特にトラブルもありませんでした。

ただ私が作成したときには日本語の翻訳が英語バージョンよりもやや古いバージョンを参照しているようで、古い情報のままになってしまっていた箇所があったため、その点は少し気をつけたほうが良さそうです。

```sh
pnpm create astro@latest
```

テンプレートに `Just the basics (recommended)` を選択すると、`.vscode` も合わせて生成されます。そのためVSCodeであれば特に意識しなくとも開発環境が整います。とはいえ今のところ、Astroコンポーネントの開発者体験がいいかというとそこまででもない印象です。

## Astro コンポーネント

```astro
---
// Component Script (JavaScript)
---

<!-- Component Template (HTML + JS Expressions) -->
```

frontmatterのようにコードフェンスの `---` で括られたエリアをComponent Script、HTMLやコンポーネントを記述する場所をComponent Templateと呼ばれています。

### Component Script

Component ScriptにはJavaScriptあるいはTypeScriptのコードを記述することで、Component Templateで使用する値を取得・生成できます。

https://lealog.hateblo.jp/entry/2022/06/13/143211

上記のサイトにもあるように、あまりコードをベタベタと書かないようにすることはよい手段と感じます。テストも書きやすいですしね。

### Component Template

Component TemplateではJSXと異なり `class` を `className` にしたり、kebab-caseの属性名をcamelCaseにしたりする必要はありません。vue.jsやsvelteのようなにスロット、あるいは名前付きのスロットを使うこともできます。

Layoutは次のようにしました。

- BaseLayout.astro - 必ず使用するLayout
  - BlogPostLayout.astro - Markdownで使用するLayout

BaseLayout.astroではほとんどなにもせず、SEO用のデータを簡単に生成できるようにしてあります。すべてのページで使用するものになるので、あまり多くのことはしないようにしています。

Blog用に使用するレイアウトは必須なのでBlogPostLayout.astroを作成しています。これは内部でBaseLayout.astroを使っています。

## CSS

[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/) も提供されているのですが、今回はTailwindを使いませんでした。

結論から言うと、AstroではTailwindのようなユーティリティクラスを使うことで開発はしやすくなるように感じています。

ユーティリティクラスを使用しなかった場合に問題となるのは [normarize.css](https://necolas.github.io/normalize.css/) のようなものを導入するケースです。Astroコンポーネントが `:where` を使用してスコープを作るため詳細度が低く、normarize.cssのスタイルを上書きするためには毎回 `:global` が必要になります。これが意外と面倒で、これだけでも個人的にはTailwindの導入動機になり得ます。

## Markdown

`*.md` を `/page/**` に配置して、frontmatterに使用するLayoutを指定するだけです。Next.jsで書いたコードのことを考えるととても楽です。デフォルトでコードにはシンタックスハイライトもつけてくれます。

プラグインを追加したくなったらastro.config.tsに追加するだけです。そのときにデフォルトで導入されているプラグインをそのまま使用する場合には `extendDefaultPlugins: true` にしておく必要があります。

私は使わないのですが、MDXも [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) の追加で使用できます。

## React

AstroはReactのコンポーネントも呼び出せて、次のコマンドだけで導入できます。

```
pnpm astro add react
```

今回はもともとがAMPの静的なサイトの移植で、JavaScriptが不要になるため普通に呼び出しただけです。

Astroですごいところは単にReactのコンポーネントを使えるからというわけではありません。

それは今回使用しなかったのですが `client:*` ディレクティブで、これはコンポーネントのハイドレーションを制御できます。詳しくは[ドキュメント](https://docs.astro.build/en/reference/directives-reference/#client-directives)を参照してください。

また可搬性を考慮しAstroコンポーネントではなく、あえてReactコンポーネントを新規で作成することがあります。その場合にはAstroのコンポーネントを含めることができません。可搬性を考慮したのだからそれはそうなのですが、[@astrojs/image](https://github.com/withastro/astro/tree/main/packages/integrations/image/) の `<Image />` や `<Picture />` を使えないので、そこで葛藤を抱えることがありました。

## RSS / Sitemap

Astro Integrationsを使えばBlogにほしい機能は簡単に追加ができます。

- [@astrojs/sitemap - sitemap.xml](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [@astrojs/rss - RSS](https://docs.astro.build/en/guides/rss/)

sitemapはデフォルトだとそこまでの容量にならなくても分割され、sitemap.xmlではなくsitemap-index.xmlを生成する点に注意が必要です。

ただしRSSは少し使いにくく、自分で素朴に `import.meta.glob` を使って生成するコードを追加して @astrojs/rssは使いませんでした。具体的に使いにくかったのはfrontmatterで投稿日として `pubDate` が必須になっていることです。
