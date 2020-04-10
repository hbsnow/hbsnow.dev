---
title: 固定のヘッダーがアンカー先コンテンツを隠してしまう問題
tags: [css]
description: 固定のヘッダーがあるときのページ内リンクで、アンカー先コンテンツを隠してしまう問題の解決策。
createdAt: 2020-04-09
---

固定のヘッダーがアンカー先コンテンツを隠してしまう、これはしばしば問題になることがあります。

この問題にはいくつかの解決策があるので、ここでは 5 つの解決策を紹介します。実装サイトも記載しておきますが、記事を書いた当時のものなので現在の実装とは異なる可能性があることにご注意ください。

## 1. JavaScript

JavaScript での実装。

これは説明が不要だと思うのでここでは省略する。画像の高さだったり、考えることもあるのであえてこの方法を使うメリットが思いつかないのであれば、この方法で実装する必要はないはず。

## 2. 空の Element を利用する

実際のリンク先に ID を付与するのではなく空の別の要素を置いておいて、それを絶対配置で飛ばしておく方法。

- [Next.js](https://nextjs.org/)

```css
.docs .heading > span[id] {
  display: block;
  position: absolute;
  visibility: hidden;
  margin-top: -128px;
  padding-top: 128px;
}
```

よくやる手法ではあるが、いかんせんリンクの飛び先以外の役割しかもっていない空の `<span>` がいまいちイケてないし、すべてのリンクに挿入する必要もあって面倒だ。

## 3. 疑似要素で領域を確保する

疑似要素を使って、上方向に領域を確保しておく方法。

- [web.dev](https://web.dev/)

```css
*:not([href])[id]::before {
  content: ' ';
  display: block;
  height: 65px;
  margin-top: -65px;
  pointer-events: none;
  visibility: hidden;
}
```

悪くないんだけど、問題はこの要素に擬似要素を使いたいときに、使いたくても使えないという状況が考えられて不安にはなる。

## 4. target 擬似クラスで領域を確保する

かなりスマートな方法。

- [blog.jxck.io](https://blog.jxck.io/)

```css
h2:target,
h3:target,
h4:target,
h5:target,
h6:target {
  margin-top: calc((var(--icon-size) + var(--grid)) * -1);
  padding-top: calc((var(--icon-size) + var(--grid)));
}
```

デメリットはリンク先になる要素が何になるかわからない場合、かなり面倒になりそうな感じがすることだろうか。

## 5. scroll-padding-top

1 から 4 の方法には結局なんらかの問題があるが、`scroll-padding-top` さえ使えるようになればこの記事にはなんの価値もなくなる。これさえ知っていればいいからね。

```css
html {
  scroll-padding-top: 20px;
}
```

IE11 のおかげで、これの完全なサポートが必要になるのであれば、使うことができない。

とはいっても、ページ内リンクのリンク先の文字が固定ヘッダーに隠されないようにするという挙動のサポートであればいらない判断もされないことはないんじゃないかと思うので交渉できるなら交渉の余地はあるんじゃないだろうか。
