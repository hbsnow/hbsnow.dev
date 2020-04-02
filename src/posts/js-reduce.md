---
title: reduce の使いどころ
tags: JavaScript
description: JavaScript の reduce の使いどころについて。
datePublished: 2019-07-22
dateModified: 2020-04-02
---

JavaScript の `reduce` は便利だけれども、普段使いで別言語をやっていたりすると少し使いどころがわかりにくいらしい。

[MDN にわかりやすいサンプル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)もあるんだけど、自分の整理もかねてこのブログでよくある使用方法をまとめておくことにする。

## reduce の使いどころ

### 配列の合計を計算する

`reduce` のよくある例としてありがちなのが合計値の計算。

```js
;[3, 7, 1, 2].reduce((accumulator, currentValue) => accumulator + currentValue) // => 13
```

こういった単純な一次配列をただ合計することもできるし、

```js
const cart = [
  { itemId: 1, quantity: 3 },
  { itemId: 2, quantity: 2 },
  { itemId: 3, quantity: 1 },
]

const sum = cart.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.quantity
}, 0)

console.log(sum) // => 6
```

このようなオブジェクトの特定プロパティの総数を数えることもできるし、特定のプロパティ名のある値をもつものだけを除外することもできる。

```js
const sum = cart.reduce((accumulator, currentValue) => {
  return currentValue.itemId !== 2
    ? accumulator + currentValue.quantity
    : accumulator
}, 0)

console.log(sum) // => 4
```

### オブジェクトの配列から最大、最小値をもつオブジェクトを取得する

```js
const maxItem = cart.reduce((accumulator, currentValue) =>
  accumulator.quantity > currentValue.quantity ? accumulator : currentValue
)
console.log(sum) // => { itemId: 1, quantity: 3 }

const minItem = cart.reduce((accumulator, currentValue) =>
  accumulator.quantity < currentValue.quantity ? accumulator : currentValue
)
console.log(sum) // => { itemId: 3, quantity: 1 }
```

### 集計する

SQL でいう `group by` のような集計を取りたいときに便利。

```js
const items = [
  { amount: 500, taxRate: 8 },
  { amount: 1000, taxRate: 8 },
  { amount: 1200, taxRate: 10 },
  { amount: 0, taxRate: 0 },
]
```

こんな配列から `taxRate` ごとに集計をとりたくなったときには、以下のように `reduce` を使うとうまく記述できる。

```js
const groupByTaxRate = (items) => {
  const taxes = items.reduce((accumulator, currentValue) => {
    const key = currentValue.taxRate
    accumulator[key] = !accumulator[key]
      ? currentValue.amount
      : accumulator[key] + currentValue.amount

    return accumulator
  }, {})

  return Object.keys(taxes).map((taxKey) => ({
    taxRate: parseInt(taxKey),
    amount: taxes[taxKey],
  }))
}
```

`groupByTaxRate(items)` の出力結果は以下の通り。

```js
;[
  { taxRate: 0, amount: 0 },
  { taxRate: 8, amount: 1500 },
  { taxRate: 10, amount: 1200 },
]
```

### flatten

[flat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) が使えるのであればこんなことをする必要はない。

```js
const arr = [1, 2, [3, 4]]
console.log(arr.flat()) // => [1, 2, 3, 4]
```

これを `reduce` で同じことをしようとすると、

```js
console.log(
  arr.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    []
  )
) // => [1, 2, 3, 4]
```

こうなる。

ただ、2 次元より大きな配列に対応するためにはもう少し複雑な処理が必要になって、[MDN の flat の項目](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat)にもあるのでそちらにまかせることとします。

### async/await で配列の順次処理

これについては別記事 [JavaScript の async/await を forEach で使ったらハマった話](/blog/async-await-higher-order-function/)で書いたのでそちらを参照してください。

## reduce は使うべきか

- [Is reduce() bad? - HTTP 203](https://www.youtube.com/watch?v=qaGjS7-qWzg)

[Jake Archibald が Twitter で reduce について言及して](https://twitter.com/jaffathecake/status/1213077702300852224) 少し話題になっていて、自分も考えさせられた。

例えば合計値を求める場合には以下のように書き直すことができる。

```js
let sum = 0
for (const item of cart) {
  sum += item.quantity
}
```

`eslint-config-airbnb` の Lint のルールが採用されていて、`no-restricted-syntax` にひっかかるので業務上使えない事情がある場合にはどうしようもないけれど、読みやすさでいえば自分も圧倒的に `for..of` での記述のほうが読みやすいと感じる。

これまで `reduce` を使っていたのは `let sum = 0` の再代入がちょっと微妙に思えたからと短い記述で書けるカッコよさが理由で、読みやすさを犠牲にしてまで貫かなければいけないものではなかったので、`reduce` を使うときには一度立ち止まって考えてみることにしようと思う。
