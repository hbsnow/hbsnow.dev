---
layout: "@/layouts/BlogPostLayout.astro"
title: JavaScript でオブジェクトの配列を sort をする
tags: [javascript]
description: JavaScript でオブジェクトの配列を sort をする方法。
createdAt: 2020-05-06
---

## まとめ

1. `Array.prototype.sort` は破壊的
1. ES2019 以降は安定ソート、そうでなければ実装依存
1. 基本的には `lodash.sortby` を使う
1. 複数の key が判定の条件にあって ASC/DESC が異なる場合には `lodash.orderby` を使う
1. ライブラリが使えない場合、`Array.prototype.sort` で頑張る。必ずテストコードを書く

## まえがき

今回ソート対象のサンプルは上記の商品の名前と料金の配列になります。`suger` に `amount` が定義されていないことが特徴です。

```js
const items = [
  { name: "juice", amount: 500 },
  { name: "suger" },
  { name: "lunch-b", amount: 1200 },
  { name: "coffee", amount: 500 },
  { name: "smile", amount: 0 },
  { name: "lunch-a", amount: 1000 },
];
```

基本的なことになるのですが JavaScript の sort は破壊的で、非破壊ソートがありません。

また ES2019 以降は安定ソート、つまり同等なデータのソート順は保持されます。ですが、それ以前の仕様については明確に定義されていないので実装依存になっています。幅広いブラウザの対応と厳密なソートが必要なときには、ユニットテストで通ってもブラウザで表示順が異なるといったことも考えられるので注意が必要です。

## lodash の sortBy を使う

普通のソートであれば `lodash.sortBy` を使ってしまえば多くの場合、簡単に目的を達成できます。

### name でのソート

name をアルファベットの昇順でソートするの場合、特に考えることはありません。

```js
import sortBy from "lodash.sortby";

const sortedItems = sortBy(items, "name");
// =>
// [
//   { name: 'coffee', amount: 500 },
//   { name: 'juice', amount: 500 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'lunch-b', amount: 1200 },
//   { name: 'smile', amount: 0 },
//   { name: 'suger' }
// ]
```

降順にしたい場合、そのためだけにわざわざ `lodash.orderBy` をもってくる必要はありません。

```js
const sortedItems = sortBy(items, "name").reverse();
```

アルファベット順以外の基準で並べたい場合には、ただ第二引数に key を与えるだけでは足りません。ここでは例として文字数でソートしてみます。

```js
const sortedItems = sortBy(items, (item) => item.name.length);
// =>
// [
//   { name: 'suger' },
//   { name: 'juice', amount: 500 },
//   { name: 'smile', amount: 0 },
//   { name: 'coffee', amount: 500 },
//   { name: 'lunch-b', amount: 1200 },
//   { name: 'lunch-a', amount: 1000 }
// ]
```

### amount でのソート

amount は suger で定義されていません。そのまま amount を指定すると次のような結果になります。

```js
import sortBy from "lodash.sortby";

const sortedItems = sortBy(items, "amount");
// =>
// [
//   { name: 'smile', amount: 0 },
//   { name: 'juice', amount: 500 },
//   { name: 'coffee', amount: 500 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'lunch-b', amount: 1200 },
//   { name: 'suger' }
// ]
```

key を持たないオブジェクトがあってもエラーになることはありません。

この例では、suger は無料なので配列の先頭にあるほうが自然です。key が存在しない場合には、そのオブジェクトを配列の先頭にしてみます。

```js
import sortBy from "lodash.sortby";

const sortedItems = sortBy(items, [(item) => "amount" in item, "amount"]);
// =>
// [
//   { name: 'suger' },
//   { name: 'smile', amount: 0 },
//   { name: 'juice', amount: 500 },
//   { name: 'coffee', amount: 500 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'lunch-b', amount: 1200 }
// ]
```

amount の key がある場合には後ろにまわしています。

### name と amount でのソート

条件が複数ある場合、どちらも昇順であれば条件を優先したい順に列挙するだけで問題ありません。

```js
import sortBy from "lodash.sortby";

const sortedItems = sortBy(items, [
  (item) => "amount" in item,
  "amount",
  "name",
]);
// =>
// [
//   { name: 'suger' },
//   { name: 'smile', amount: 0 },
//   { name: 'coffee', amount: 500 },
//   { name: 'juice', amount: 500 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'lunch-b', amount: 1200 }
// ]
```

ただし、amount を降順、name を昇順のようにソート順が key によって異なる場合には複雑になります。

```js
import sortBy from "lodash.sortby";

const sortedItemsByNameDesc = sortBy(items, "name").reverse();
const sortedItems = sortBy(sortedItemsByNameDesc, [
  (item) => "amount" in item,
  "amount",
]).reverse();
// =>
// [
//   { name: 'lunch-b', amount: 1200 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'coffee', amount: 500 },
//   { name: 'juice', amount: 500 },
//   { name: 'smile', amount: 0 },
//   { name: 'suger' }
// ]
```

最終的に reverse するので、その前準備としてのソート `sortedItemsByNameDesc` も最終的なソートとは逆のソートにする必要があってわかりにくい。

ここまで必要になるのであれば、素直に orderBy がわかりやすいです。

```js
import orderBy from "lodash.orderBy";

const sortedItems = orderBy(
  items,
  [(item) => "amount" in item, "amount", "name"],
  ["desc", "desc", "asc"]
);
// =>
// [
//   { name: 'lunch-b', amount: 1200 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'coffee', amount: 500 },
//   { name: 'juice', amount: 500 },
//   { name: 'smile', amount: 0 },
//   { name: 'suger' }
// ]
```

### name を指定順でソート

`name` を指定順に並べたいときには並べたい順の配列をあらかじめ作っておき、`indexOf` を比較します。

```js
import sortBy from "lodash.sortby";
const desiredSort = ["lunch-a", "lunch-b", "juice"];

const sortedItems = sortBy(items, (item) => {
  const index = desiredSort.indexOf(item.name);
  return index === -1 ? undefined : index;
});
```

上記の例では希望する順序の配列 `desiredSort` に含まれないものを後ろにしていますが、前にするのであれば `indexOf` の戻りをそのまま戻すだけになります。

## sort を使う

プロジェクトによっては自分の判断でライブラリをインストールできない場合もあるので、そういったときには sort を使う必要がでてきます。

最初に書いたように JavaScript の sort は破壊的ソートなので、直接配列を sort できません。そのため name の昇順は次のように記述する必要があります。

```js
const sortedItems = [...items].sort((a, b) => (a.name < b.name ? -1 : 1));
// =>
// [
//   { name: 'coffee', amount: 500 },
//   { name: 'juice', amount: 500 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'lunch-b', amount: 1200 },
//   { name: 'smile', amount: 0 },
//   { name: 'suger' }
// ]
```

amount のように key が存在しない場合には少し注意が必要です。

```js
// ダメな例
const sortedItems = [...items].sort((a, b) => (a.amount < b.amount ? -1 : 1));
```

これは `undefined` の比較が発生してしまうため正しくソートされません。

ただしくソートするためには、次のようなコードを書く必要があります。

```js
const sortedItems = [...items].sort((a, b) => {
  if (a.amount !== undefined || b.amount !== undefined) {
    if (a.amount === undefined) return -1;
    if (b.amount === undefined) return 1;
  }

  if (a.amount !== undefined && b.amount !== undefined) {
    if (a.amount < b.amount) return -1;
    if (a.amount > b.amount) return 1;
  }

  return 0;
});
// =>
// [
//   { name: 'suger' },
//   { name: 'smile', amount: 0 },
//   { name: 'juice', amount: 500 },
//   { name: 'coffee', amount: 500 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'lunch-b', amount: 1200 }
// ]
```

`0` と `undefined` がどちらも falsy なのでややこしく、テストがないと不安の残るコードになります。

さらにこれを amount を降順、name を昇順にする場合にはさらに複雑で次のようになります。

```js
const sortedItems = [...items].sort((a, b) => {
  if (a.amount !== undefined || b.amount !== undefined) {
    if (a.amount === undefined) return 1;
    if (b.amount === undefined) return -1;
  }

  if (a.amount !== undefined && b.amount !== undefined) {
    if (a.amount < b.amount) return 1;
    if (a.amount > b.amount) return -1;
  }

  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;

  return 0;
});
// =>
// [
//   { name: 'lunch-b', amount: 1200 },
//   { name: 'lunch-a', amount: 1000 },
//   { name: 'coffee', amount: 500 },
//   { name: 'juice', amount: 500 },
//   { name: 'smile', amount: 0 },
//   { name: 'suger' }
// ]
```

メンテナンスのことを考えるとあまり書きたいとは思えません。
