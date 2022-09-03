---
layout: "@/layouts/BlogPostLayout.astro"
title: Astro と React のコンポーネントでブログを作り直した
tags: [astro, react]
description: Next.js で SSG していたブログを Astro を使って作り直しました。
createdAt: 2022-09-03
---

[クラスメソッド入社して以来 DeveloperIO にブログを書くようになった](https://dev.classmethod.jp/author/takahashi-yuki/)ため、このブログに記事を書くことがなくなりましたが、最近 [Astro が 1.0 になった](https://astro.build/blog/astro-1/)ので作り直してみることにしました。

またこの記事は Astro の機能を網羅的に紹介するものではなく、作成時において気になった点を記録しておくものです。そのため Astro がどういったものかを知るために、まずは[公式のドキュメント](https://astro.build/)を参照ください。

## 前提

もともとは [Metalsmith](https://metalsmith.io/) で作成していたものを、[Next.js が SSG に対応したとき](/blog/nextjs-blog-ssg)書き換えたものでした。

そのため記事のデータは Web の API で取得するようなものではなく、ローカルの Markdown のファイルからビルドするという形をとっています。それを Next.js でやろうとすると、意外と自分で結構な量のコードを書かないといけないのでメンテナンスが面倒です。

Astro であれば、`page` ディレクトリ内に `.md` または `.mdx` ファイルを置くだけで自動的にページのルートが構築されるため、これがもっとも大きな移行動機になります。

## Astro を使う動機

[ドキュメントを見ながら](https://docs.astro.build/en/getting-started/)進めれば困ることはありません。今回は pnpm を使いましたが特にトラブルもありませんでした。

ただ私が作成したときには日本語の翻訳が英語バージョンよりもやや古いバージョンを参照しているようで、古い情報のままになってしまっていた箇所があったため少し気をつけたほうが良さそうです。

```sh
pnpm create astro@latest
```

テンプレートに `Just the basics (recommended)` を選択すると、`.vscode` も合わせて生成されます。そのため VSCode であれば特に意識しなくとも開発環境が整います。とはいえ今のところ、Astro コンポーネントの開発者体験がいいかというと微妙なところではあります。

## Astro コンポーネント

```astro
---
// Component Script (JavaScript)
---

<!-- Component Template (HTML + JS Expressions) -->
```

frontmatter のようにコードフェンスの `---` で括られたエリアを Component Script、HTML やコンポーネントを記述する場所を Component Template と呼ばれています。

### Component Script

Component Script には JavaScript あるいは TypeScript のコードを記述することで、Component Template で使用する値を取得・生成できます。

https://lealog.hateblo.jp/entry/2022/06/13/143211

上記のサイトにもあるように、あまりコードをベタベタと書かないようにすることはよい手段と感じます。テストも書きやすいですしね。

### Component Template

Component Template では JSX と異なり `class` を `className` にしたり、kebab-case の属性名を camelCase にしたりする必要はありません。vue.js や svelte のようなにスロット、あるいは名前付きのスロットを使うこともできます。

Layout は次のようにしました。

- BaseLayout.astro - 必ず使用する Layout
  - BlogPostLayout.astro - Markdown で使用する Layout

BaseLayout.astro ではほとんどなにもせず、SEO 用のデータを簡単に生成できるようにしてあります。すべてのページで使用するものになるので、あまり多くのことはしないようにしています。

Blog 用に使用するレイアウトは必須なので BlogPostLayout.astro を作成しています。これは内部で BaseLayout.astro を使っています。

## CSS

[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/) も提供されているのですが、今回は Tailwind を使いませんでした。

結論から言うと、Astro では Tailwind のようなユーティリティクラスを使うことで開発はしやすくなるように感じています。

問題になるのは [normarize.css](https://necolas.github.io/normalize.css/) のようなものを導入するケースです。Astro コンポーネントが `:where` を使用してスコープを作るため詳細度が低く、normarize.css のスタイルを上書きするためには毎回 `:global` が必要になります。これが意外と面倒で、これだけでも個人的には Tailwind の導入動機になり得ます。

## Markdown

`*.md` を `/page/**` に配置して、frontmatter に使用する Layout を指定するだけです。Next.js で書いたコードのことを考えるととても楽。デフォルトでコードにはシンタックスハイライトもつけてくれて、いたれりつくせり。

プラグインを追加したくなったら astro.config.ts に追加するだけです。そのときにデフォルトで導入されているプラグインをそのまま使用する場合には `extendDefaultPlugins: true` にしておく必要があります。

私は使わないのですが、MDX も [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) の追加で使用できます。

## React

Astro は React のコンポーネントも呼び出せて、次のコマンドだけで導入できる。

```
pnpm astro add react
```

今回はもともとが AMP の静的なサイトの移植で、JavaScript が不要になるため普通に呼び出しただけです。

Astro ですごいところは単に React のコンポーネントを使えるからというわけではありません。

それは今回使用しなかったのですが `client:*` ディレクティブで、これはコンポーネントのハイドレーションを制御できます。詳しくは[ドキュメント](https://docs.astro.build/en/reference/directives-reference/#client-directives)を参照してください。

また可搬性を考慮し Astro コンポーネントではなく、あえて React コンポーネントを新規で作成することがあります。その場合には Astro のコンポーネントを含めることができません。可搬性を考慮したのだからそれはそうなのですが、[@astrojs/image](https://github.com/withastro/astro/tree/main/packages/integrations/image/) の `<Image />` や `<Picture />` を使えないので、そこで葛藤を抱えることがありました。

## RSS / Sitemap

Astro Integrations を使えば Blog にほしい機能は簡単に追加ができます。

- [@astrojs/sitemap - sitemap.xml](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [@astrojs/rss - RSS](https://docs.astro.build/en/guides/rss/)

ただし RSS は少し使いにくく、私は自分で生成するようなコードを追加して @astrojs/rss を使いませんでした。具体的には frontmatter で投稿日を `pubDate` が必須になっていることです。
