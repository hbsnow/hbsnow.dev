---
title: Next.js の SSG で AMP-only のブログを作った
tags: [nextjs, amp]
description: Next.js の SSG で AMP-only のブログを作ったのでそのメモ。
createdAt: 2020-05-23
updatedAt: 2020-05-30
---

Next.js が 9.3 で SSG を正式にサポートしました。この記事はこのブログの作成方法の記録になります。

- https://github.com/hbsnow/hbsnow.dev

コードは上記で公開しています。

## ブログの記事を何で書くか

最近では mdx がそこそこ使われ始めているようで、その流れにのって最初はブログの記事を mdx にしていました。ただ VSCode でのエディタの補完がほぼないに等しくて、ストレスになってしまったので採用を諦めて普通に Markdown で書くことにしました。

mdx の場合、あまり考えずに [Next.js のリポジトリにある examples](https://github.com/zeit/next.js/tree/canary/examples) を参考に作成できるはずです。

作ったページは次の表の通りです。

| path                                   | 内容                         |
| -------------------------------------- | ---------------------------- |
| `/src/pages/blog/index.tsx`            | ブログ記事一覧               |
| `/src/pages/blog/[slug]/index.tsx`     | ブログ記事                   |
| `/src/pages/blog/tag/[slug]/index.tsx` | タグでフィルタされた記事一覧 |
| `/src/posts/*.md`                      | Markdown で書かれた記事原稿  |

必要性を感じなかったのでタグの一覧のページはありません。

### ブログ記事一覧

ブログの記事一覧の取得は下記のサイトが参考になります。

- [Creating a Markdown Blog with Next.js](https://dev.to/tinacms/creating-a-markdown-blog-with-next-js-52hk)

```ts
export type BlogType = {
  slug: string
} & matter.GrayMatterFile<string>['data']

export const loadBlogList = (): BlogType[] => {
  const blogList = ((context): BlogType[] => {
    const keys = context.keys()
    const values = keys.map<{ [key: string]: string }>(context)

    return keys.map((key, i) => {
      const slug = path.basename(key, '.md')
      const blog = matter(values[i].default)

      return { slug, ...blog.data }
    })
  })(require.context(`../posts`, true, /\.md$/))

  return JSON.parse(JSON.stringify(blogList))
}
```

`JSON.parse(JSON.stringify(blogList))` の部分は Date 型を string に変換しています。これをしないと下記のようなエラーが発生します。

```
SerializableError: Error serializing `.blogList[0].createdAt` returned from `getStaticProps` in "/".
Reason: `object` ("[object Date]") cannot be serialized as JSON. Please only return JSON serializable data types.
```

これについては[いくつか issue](https://github.com/zeit/next.js/issues/11993) もあるようです。

`matter.GrayMatterFile<string>['data']` には YAML front matter のデータが含まれていて、以下のようにタグでフィルタされた記事一覧も取得できます。

```ts
export const getStaticPaths: GetStaticPaths = async (): Promise<{
  fallback: boolean
  paths: string[]
}> => {
  const blogList = loadBlogList()
  const paths = blogList
    .flatMap((blog) => blog.tags)
    .filter((blog, i, self) => self.indexOf(blog) === i)
    .map((tag) => `/blog/tag/${tag}/`)

  return {
    fallback: false,
    paths,
  }
}
```

### ブログ記事

Markdown の変換には `react-markdown` を使っています。[Marked](https://github.com/markedjs/marked) が使われているので、特別困ることはありませんでした。

少し面倒だったのが、header にアンカーリンクを設定するところになります。

```tsx
import { slug } from 'github-slugger'
import { onlyText } from 'react-children-utilities'

const Heading: FC<Props> = ({ level = 1, children, ...restProps }) => {
  const text = onlyText(children)
  const id = slug(text)

  return createElement(
    `h${level}`,
    { id, ...restProps },
    <a href={`#${id}`} className="headingLink">
      {children}
    </a>
  )
}
```

[react-children-utilities](https://github.com/fernandopasik/react-children-utilities) の `onlyText` で `children` からテキストを取得して slug 用に変換しています。しかし、このまま使うと以下のようにエラーとなります。

```
Unhandled Runtime Error
Error: Must use import to load ES Module: ...
```

これは `next.config.js` で react-children-utilities をトランスパイルすることで解決できます。

```js
const withTM = require('next-transpile-modules')(['react-children-utilities'])
const nextSettings = {}

module.exports = withTM(nextSettings)
```

エラーは他にも画像の長さを取得するために [image-size](https://github.com/image-size/image-size) を使ったときに遭遇しました。

```
Prerendered Page
Failed to compile
./node_modules/image-size/dist/index.js
Module not found: Can't resolve 'fs' in '/PATH/TO/...'
```

これについては下記の Issue についているコメントが参考になります。

- [Module not found: Can't resolve 'fs' #7755](https://github.com/zeit/next.js/issues/7755#issuecomment-508633125)

## contentful で所持している本の一覧を作る

[contentful](https://www.contentful.com/) のような Headless CMS を使うことが目的だったので、使う必要があったかどうかはちょっと微妙です。最初は [GraphCMS](https://graphcms.com/) を考えていたのですが、そもそも GraphQL である必要性がなかったので無料でできる範囲の広い contentful にしました。好みもありますが、管理画面の使いやすさなどは contentful は他の類似サービスと比べると若干劣る印象はあります。

無料枠では 5000 レコードまでになるので、ブログ用途で記事を入れると 1 つの記事で 10 レコードを使うことを想定しても 500 記事くらいまではいけるので、収まる人は多そうです。無料枠でも Webhooks も使えるのですが、まだ試していないのでそのうちやろうかと思っています。

データは一度すべて取得してから、フロントでカテゴリ分類やソートをしています。

```ts
export const fetchBookList = async (): Promise<StateType['bookList']> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN ?? '',
  })

  // eslint-disable-next-line @typescript-eslint/camelcase
  const query = { content_type: 'book' }

  return client.getEntries(query)
}
```

取得件数の上限もあったようなきがするので、今後データが増えてきたらこのあたりの改修は必要になってきそうです。

型の定義は [contentful-typescript-codegen](https://github.com/intercom/contentful-typescript-codegen) を使って生成しています。

## AMP 対応

pages 配下の tsx に `export const config = { amp: true }` を書くだけで、他に特別なにかする必要はありません。

以前のブログは、AMP に対応しているページとそうでないページの 2 種類、`export const config = { amp: 'hybrid' }` のような状態にしていました。ただ結局同じようなデザインを目指してしまって、ただ 2 倍以上の苦労をするだけになったので今回は AMP-only にしました。

JSON-LD の出力には [next-seo](https://github.com/garmeeh/next-seo) を使っています。ライブラリの名前の通り、JSON-LD 以外のメタデータにも対応しているので便利です。

## Open Graph Image

[zeit/og-image](https://github.com/zeit/og-image) を使ってブログの記事に合わせた Open Graph Image を表示しています。リポジトリを fork して now にデプロイするだけで、無料ですぐに使えるのでおすすめです。

ただそのまま fork するだけでは画像も変更できず、日本語も使用できないためいくつか修正が必要です。

- [commit 3af90ae9](https://github.com/hbsnow/og-image/commit/3af90ae921cd4ce0ed2063074c45e85d8873d518)

上記がアイコンの差し替えのコミットです。そのまま使ってしまうと `https://assets.vercel.com/` から始まるアドレス以外の画像をデフォルトの画像に置き換える処理が含まれているので、その箇所の削除が必要になります。fork して使うことが前提なのに、なぜこうなっているのかよくわかりません。

- [commit 598b68f1](https://github.com/hbsnow/og-image/commit/598b68f11601840d534833da9878b992e1aa0772)

上記がフォントの差し替えです。デフォルトだと日本語が豆腐になります。

## CSS

最初は emotion を採用していたのですが、以下のエラーが発生しました。

```
/  error  The parent tag of tag 'style amp-custom (transformed)' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml#stylesheets
```

この現象は `export const config = { amp: true }` で AMP を有効にすることで発生します。emotion の出力する style 属性が body 以下に出力されるのが問題そうで、色々解決策を調べたのですが無理だったので諦めました。

結局 style-jsx にしたのですが、style-jsx も次のように Media Queries に変数を使用してしまうと VSCode でエラーが表示されてしまいます。

```
<style jsx>
  @media ${mediaQuery.sm} {
    // ここ以降うまくパースできてない
  }
</style>
```

- https://github.com/Grimones/vscode-styled-jsx-languageserver/issues/15

上記 issue にもあるように Language Server がメンテナンスされておらず、[フォークされたもの](https://github.com/Southclaws/vscode-styled-jsx-languageserver)でも大量のエラーで OUTPUT のログが埋まってしまう状態になりました。さすがに CSS をこの状態で記述することは厳しすぎるため、自分で好んで style-jsx を使うことはしばらくなさそうです。

## sitemap.xml

- [[Feature Request] native static sitemaps #12354](https://github.com/vercel/next.js/issues/12354)

上記の Isuue にあるようにそのうちなにか簡単に実装できるかなともおもいましたが、なにもないというのも若干不安だったのでとりあえず暫定的に出力できるようにしておきました。

```js
const readPathList = async (target, base) => {
  try {
    const posts = await fs.promises.readdir(target, {
      withFileTypes: true,
    })

    return posts.map((dirent) => `${base}/${dirent.name}/`)
  } catch (err) {
    Promise.reject(err)
  }
}
```

ブログの一覧は上記のコードで取得し、適切な文字列に返還した後 `fs.promises.writeFile` で出力しただけです。
