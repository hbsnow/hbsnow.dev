---
title: 固定のヘッダーがアンカー先コンテンツを隠してしまう問題
tags: [css]
description: 固定のヘッダーがあるときのページ内リンクで、アンカー先コンテンツを隠してしまう問題の解決策。
createdAt: 2020-04-09
---

固定のヘッダーがアンカー先コンテンツを隠してしまう、これはしばしば問題になることがあります。

この問題にはいくつかの解決策があるので、ここでは5つの解決策を紹介します。実装サイトの参考としてリンクも記載しておきますが、記事を書いた当時のものなので現在の実装とは異なる可能性があることにご注意ください。

## 1. JavaScript

JavaScriptでの実装は説明が不要なのでここでは省略します。画像の高さだったり、考えることもあるのであえてこの方法を使うメリットが思いつかないのであれば、この方法で実装する必要はないはずです。

## 2. 空の Element を利用する

実際のリンク先にIDを付与するのではなく空の別の要素を置いておいて、それを絶対配置で飛ばしておく方法になります。

https://nextjs.org/

```css
.docs .heading > span[id] {
  display: block;
  position: absolute;
  visibility: hidden;
  margin-top: -128px;
  padding-top: 128px;
}
```

よくやる手法ではありますが、いかんせんリンクの飛び先以外の役割しかもっていない空の `<span>` がいまいちイケてないし、すべてのリンクに挿入する必要もあって面倒です。

## 3. 疑似要素で領域を確保する

疑似要素を使って、上方向に領域を確保しておく方法。

https://web.dev/

```css
*:not([href])[id]::before {
  content: " ";
  display: block;
  height: 65px;
  margin-top: -65px;
  pointer-events: none;
  visibility: hidden;
}
```

悪くないのですが、問題はこの要素に擬似要素を使いたいときに、使いたくても使えないという状況が考えられて不安にはなります。

## 4. target 擬似クラスで領域を確保する

とてもスマートな方法。

https://blog.jxck.io/

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

デメリットはリンク先になる要素が何になるかわからない場合、かなり面倒になりそうな感じがすることでしょうか。

## 5. scroll-padding-top

1から4の方法には結局なんらかの問題があるが、`scroll-padding-top` さえ使えるようになればこの記事に価値はありません。これさえ知っていればいいので。

```css
html {
  scroll-padding-top: var(--scroll-padding-top);
}
```

IE11のおかげで、この挙動の完全なサポートが必要になるのであれば、使うことができません。

### scroll-padding-top がまれに正しく動作しない

AMPページの場合多くはただしく動作するのですが、ごくまれに `padding` を確保してくれないことがあります。最初のうちは `scroll-padding-top` のバグかと思ったのですが、クリックイベント自体を削除してみるとただしく動作したのでAMPが原因のようでした。
