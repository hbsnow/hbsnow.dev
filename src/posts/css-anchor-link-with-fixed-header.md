---
title: 固定のヘッダーがアンカー先コンテンツを隠してしまう問題
tags: [css]
description: 固定のヘッダーがあるときのページ内リンクで、アンカー先コンテンツを隠してしまう問題の解決策
createdAt: 2020-04-09
---

## JavaScript

- [Material Design](https://material.io)

## Element

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

## before

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

## target

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

## scroll-padding-top

```css
html {
  scroll-padding-top: 20px;
}
```
