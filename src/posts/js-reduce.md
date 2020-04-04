---
title: reduce の使いどころ
tags: [javascript]
description: JavaScript の reduce の使いどころについて。
createdAt: 2019-07-22
updatedAt: 2020-04-02
---

JavaScript の `reduce` は便利だけれども、普段使いで別言語をやっていたりすると少し使いどころがわかりにくいらしい。

[MDN にわかりやすいサンプル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)もあるんだけど、自分の整理もかねてこのブログでよくある使用方法をまとめておくことにする。

## reduce の使用例

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

SQL でいう `group by` のような集計を取りたいときに便利。配列の合計を計算するをすこし複雑に使った場合の例になると思う。

```js
const items = [
  { amount: 500, taxRate: 8 },
  { amount: 1000, taxRate: 8 },
  { amount: 1200, taxRate: 10 },
  { amount: 0, taxRate: 0 },
]
```

こんな配列から `taxRate` ごとに集計をとりたくなったときには、以下のように記述できる。

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

```
[
  { taxRate: 0, amount: 0 },
  { taxRate: 8, amount: 1500 },
  { taxRate: 10, amount: 1200 },
]
```

`reduce` を使わなかった場合には

```js
const groupByTaxRate = (items) => {
  let taxes = {}
  for (const item of items) {
    if (!taxes[item.taxRate]) {
      taxes[item.taxRate] = item.amount
      continue
    }
    taxes[item.taxRate] = taxes[item.taxRate] + item.amount
  }

  return Object.keys(taxes).map((taxKey) => ({
    taxRate: parseInt(taxKey),
    amount: taxes[taxKey],
  }))
}
```

こんな感じになるだろうか。どちらが読みやすいかはちょっと迷うところ。

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

## reduce を使うべきか

- [Is reduce() bad? - HTTP 203](https://www.youtube.com/watch?v=qaGjS7-qWzg)

[Jake Archibald が Twitter で reduce について言及して](https://twitter.com/jaffathecake/status/1213077702300852224) 少し話題になっていて、自分も考えさせられた。

合計や最大値を求めるといった以外のループとしての用途で使うことがそれなりにあったからだ。

### reduce をループとして使う例

`reduce` をループとして使うシンプルな例を示そう。

```js
const items = [
  { amount: 500, taxRate: 8 },
  { amount: 1000, taxRate: 8 },
  { amount: 1200, taxRate: 10 },
  { amount: 0, taxRate: 0 },
]
```

さきほどのサンプルの配列で、amount が 1000 以上のものについてそれぞれ`+100`した結果のオブジェクトの配列、つまり

```
[
  { amount: 1100, taxRate: 8 }
  { amount: 1300, taxRate: 10 }
]
```

このような結果がほしいとき、`reduce` を使った場合には

```js
const result = items.reduce((accumulator, currentValue) => {
  if (currentValue.amount >= 1000) {
    accumulator.push({
      ...currentValue,
      amount: currentValue.amount + 100,
    })
  }

  return accumulator
}, [])
```

でもこれは実際にこんな書き方をする必要はなくて

```js
const result = items
  .filter((item) => item.amount >= 1000)
  .map((item) => ({
    ...item,
    amount: item.amount + 100,
  }))
```

`map` と `filter` で書き直すことができる。

このコードを `reduce` で記述するのはなんだか賢くなった気分になる、というのは確かにあるが、この例は明らかに `map` と `filter` のほうがリーダブルだ。

動画の最後に紹介されている [Underdash](https://surma.github.io/underdash/) はシンプルなイディオムがまとまっていて便利なので、ここでもおすすめしておく。

## TypeScript で型をつける

先程の `items` を例にすると次のように書ける

```ts
type ItemType = {
  amount: number
  taxRate: number
}

type TaxItemType = {
  [key: string]: number
}

const items: ItemType[] = [
  { amount: 500, taxRate: 8 },
  { amount: 1000, taxRate: 8 },
  { amount: 1200, taxRate: 10 },
  { amount: 0, taxRate: 0 },
]

const taxes = items.reduce<TaxItemType>((accumulator, currentValue) => {
  const key = currentValue.taxRate
  accumulator[key] = !accumulator[key]
    ? currentValue.amount
    : accumulator[key] + currentValue.amount

  return accumulator
}, {})
```

`reduce` の型定義を確認すればわかるのだが、ジェネリクスを使うかあるいは `accumulator` を `accumulator: TaxItemType` として型をわたしてあげるといい。
