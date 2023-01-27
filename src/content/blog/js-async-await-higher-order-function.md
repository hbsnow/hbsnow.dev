---
layout: "@/layouts/BlogPostLayout.astro"
title: async/await を forEach で使ったらハマった話
tags: [javascript]
description: JavaScript の async/await を forEach で使ったらハマった話を社内で発表したので、発表内容に関する資料。
createdAt: 2019-04-14
updatedAt: 2019-04-21
---

https://hackmd.io/UsWcutr_RGyh1wKYcZOdIA

上記のスライドを社内で発表したのでそのときのまとめです。サンプルコードは下記にあります。

https://github.com/hbsnow-sandbox/js-async-await

## 前提

```js
const timer = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`timer ${delay}ms`);
      resolve(delay);
    }, delay);
  });
};

[100, 300, 200].forEach(async (delay) => {
  await timer(delay);
});
```

上記のコードで期待する結果にならなかったことを相談されたことが発表の経緯です。

```
$ # 期待した結果
$ timer 100ms
$ timer 300ms
$ timer 200ms
```

```
$ # 実際の結果
$ timer 100ms
$ timer 200ms
$ timer 300ms
```

`[100, 300, 200]` で順次実行されて欲しかったのですが実際の出力では並列で実行されてしまっています。

## 順次処理をするためには

```js
(async () => {
  for (const delay of [100, 300, 200]) {
    await timer(delay);
  }
})();
```

`for...of` で書くのが、おそらくもっともシンプルでわかりやすいはずです。

しかし、状況によっては使いたくても使えないということもあります。例えば Airbnb の JavaScript Style Guide のようなコーディングルールを採用している場合には `for...of` が使用禁止されてときなどでしょう。

そういった場合には `then` を使用することで解決できます。

```js
import { timer } from "./timer";

let promiseChain = Promise.resolve();
[100, 300, 200].forEach((delay) => {
  promiseChain = promiseChain.then(() => timer(delay));
});
```

`then` を使うのが微妙と感じるのであれば `reduce` でも実現可能です。

```js
[100, 300, 200].reduce(async (accumulator, delay) => {
  await accumulator;
  return timer(delay);
}, Promise.resolve());
```

ただこの方法だと何が目的でこういう記述になっているのか、すぐにわかりにくいのではないかと感じます。この理由についての話は[reduce の使いどころ](/blog/js-async-await-higher-order-function/)に書いています。

## 並列処理して全部終わるまで待つ

今回のスライドの趣旨とはあまり関係ありませんが、普通に並列処理して全部終わるまで待ちたいのであれば、`Promise.all()` と `map` を使います。

```js
(async () => {
  await Promise.all([100, 300, 200].map(async (delay) => await timer(delay)));
})();
```
