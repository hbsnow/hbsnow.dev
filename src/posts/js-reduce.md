---
title: reduce の使いどころ
tags: [javascript]
description: JavaScript の reduce の使いどころについて。
createdAt: 2019-07-22
updatedAt: 2020-05-30
---

## まとめ

- 配列の合計を計算する
- オブジェクトの配列から最大、最小値をもつオブジェクトを取得する
- ループとして使わないようにする

## まえがき

JavaScript の `reduce` は便利だけれども、少し使いどころがわかりにくいと感じる人もいるようです。

[MDN にわかりやすいサンプル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)もありますが、自分の整理もかねてこのブログでよくある使用方法をまとめておきます。

## reduce の使用例

ここでは上記 5 つの例をみていきます。

### 1. 配列の合計を計算する

`reduce` のよくある例としてありがちなのが合計値の計算。

```js
[3, 7, 1, 2].reduce((accumulator, currentValue) => accumulator + currentValue); // => 13
```

こういった単純な一次配列を合計できるし、以下のようなオブジェクトの特定プロパティの総数を数えることもできる。

```js
const cart = [
  { itemId: 1, quantity: 3 },
  { itemId: 2, quantity: 2 },
  { itemId: 3, quantity: 1 },
];

const sum = cart.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.quantity;
}, 0);

console.log(sum); // => 6
```

また、特定のプロパティ名のある値を除外するようなこともできる。

```js
const sum = cart.reduce((accumulator, currentValue) => {
  return currentValue.itemId !== 2
    ? accumulator + currentValue.quantity
    : accumulator;
}, 0);

console.log(sum); // => 4
```

### 2. オブジェクトの配列から最大、最小値をもつオブジェクトを取得する

`cart` の `quantity` の最大、あるいは最小の値をもつオブジェクトを取得したい場合。

```js
const maxItem = cart.reduce((accumulator, currentValue) =>
  accumulator.quantity > currentValue.quantity ? accumulator : currentValue
);
console.log(sum); // => { itemId: 1, quantity: 3 }

const minItem = cart.reduce((accumulator, currentValue) =>
  accumulator.quantity < currentValue.quantity ? accumulator : currentValue
);
console.log(sum); // => { itemId: 3, quantity: 1 }
```

単純に値だけを求めたいのであれば `Math.max(...cart.map(item => item.quantity))` とすればいいでしょう。

### 3. 集計する

SQL でいう `group by` のような集計を取りたいときに便利。

```js
const items = [
  { amount: 500, taxRate: 8 },
  { amount: 1000, taxRate: 8 },
  { amount: 1200, taxRate: 10 },
  { amount: 0, taxRate: 0 },
];
```

このような配列から `taxRate` ごとに集計をとりたくなったときには、以下のように記述できます。

```js
const groupByTaxRate = (items) => {
  const taxes = items.reduce((accumulator, currentValue) => {
    const key = currentValue.taxRate;
    accumulator[key] = !accumulator[key]
      ? currentValue.amount
      : accumulator[key] + currentValue.amount;

    return accumulator;
  }, {});

  return Object.keys(taxes).map((taxKey) => ({
    taxRate: parseInt(taxKey),
    amount: taxes[taxKey],
  }));
};
```

`groupByTaxRate(items)` の出力結果は以下の通り。

```
[
  { taxRate: 0, amount: 0 },
  { taxRate: 8, amount: 1500 },
  { taxRate: 10, amount: 1200 },
]
```

`reduce` を使わなかった場合。

```js
const groupByTaxRate = (items) => {
  let taxes = {};
  for (const item of items) {
    if (!taxes[item.taxRate]) {
      taxes[item.taxRate] = item.amount;
      continue;
    }
    taxes[item.taxRate] = taxes[item.taxRate] + item.amount;
  }

  return Object.keys(taxes).map((taxKey) => ({
    taxRate: parseInt(taxKey),
    amount: taxes[taxKey],
  }));
};
```

こんな感じになるだろうか。どちらが読みやすいかはちょっと迷うところ。

### 4. flatten

[flat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) が使えるのであればこんなことをする必要はありません。

```js
const arr = [1, 2, [3, 4]];
console.log(arr.flat()); // => [1, 2, 3, 4]
```

これを `reduce` で同じことをしてみよう。

```js
console.log(
  arr.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    []
  )
); // => [1, 2, 3, 4]
```

こうなります。

ただ、2 次元より大きな配列に対応するためにはもう少し複雑な処理が必要になって、[MDN の flat の項目](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat)にもあるのでそちらにまかせることとします。

### 5. async/await で配列の順次処理

これについては別記事 [JavaScript の async/await を forEach で使ったらハマった話](/blog/js-async-await-higher-order-function)を書いたのでそちらを参照してください。

## reduce を使うべきか

- [Is reduce() bad? - HTTP 203](https://www.youtube.com/watch?v=qaGjS7-qWzg)

[Jake Archibald が Twitter で reduce について言及して](https://twitter.com/jaffathecake/status/1213077702300852224) 少し話題になっていて、自分も考えさせられました。合計や最大値を求めるといった以外のループとしての用途で使うことってそれなりにあるんですよね。

前述のサンプルだと『async/await で配列の順次処理』がまさにこれに該当するし、『配列の合計を計算する』の最後の例。

```js
const sum = cart.reduce((accumulator, currentValue) => {
  return currentValue.itemId !== 2
    ? accumulator + currentValue.quantity
    : accumulator;
}, 0);
```

これは合計のために `reduce` は残りますが、次のように書き直せます。

```js
const sum = cart
  .filter((item) => item.itemId !== 2)
  .reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
```

### reduce をループとして使う例

`reduce` をループとして使うシンプルな例を示していきます。

```js
const items = [
  { amount: 500, taxRate: 8 },
  { amount: 1000, taxRate: 8 },
  { amount: 1200, taxRate: 10 },
  { amount: 0, taxRate: 0 },
];
```

さきほどのサンプルの配列で、amount が 1000 以上のものについてそれぞれ `+100` した結果のオブジェクトの配列。

```
[
  { amount: 1100, taxRate: 8 }
  { amount: 1300, taxRate: 10 }
]
```

このような結果がほしいとき、`reduce` を使った場合にはこうなります。

```js
const result = items.reduce((accumulator, currentValue) => {
  if (currentValue.amount >= 1000) {
    accumulator.push({
      ...currentValue,
      amount: currentValue.amount + 100,
    });
  }

  return accumulator;
}, []);
```

でもこれは実際にこんな書き方をする必要はありません。

```js
const result = items
  .filter((item) => item.amount >= 1000)
  .map((item) => ({
    ...item,
    amount: item.amount + 100,
  }));
```

`map` と `filter` で書き直すことができます。

このコードを `reduce` で記述するのはなんだか賢くなった気分になる、というのは確かにありますが、この例は明らかに `map` と `filter` のほうが何をしたいのかが明確で可読性が高いはずです。

### オブジェクトの指定 key を Omit する

オブジェクトで特定 key を除外したいとき、reduce を使うことができます。

```js
const example = {
  foo: 0,
  bar: 1,
  baz: 2,
};

const result = Object.keys(example)
  .filter((key) => !["foo", "bar"].includes(key))
  .reduce(
    (newObj, key) => ({
      ...newObj,
      [key]: example[key],
    }),
    {}
  );

console.log(result); // => { baz: 2 }
```

でも、これも `reduce` を使う必要はありません。

```js
Object.fromEntries(
  Object.entries(example).filter(([key]) => !["foo", "bar"].includes(key))
);
```

`Object.fromEntries` と `Object.entries` で記述できるし、この例だともっとシンプルに次のように書くことができます。

```js
const { foo, bar, ...result } = example;
```

これで問題ないはずです。

また、こういった配列処理の例は[動画](https://www.youtube.com/watch?v=qaGjS7-qWzg)の最後に紹介されている [Underdash](https://surma.github.io/underdash/) にまとまっているので、ここでもおすすめしておきます。
