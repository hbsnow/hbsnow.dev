---
title: 文字数によって区切りのあるテキストフォームを作る
tags: [react, javascript]
description: 文字数によって区切りのあるテキスト用のフォームを作成します。
createdAt: 2020-06-06
updatedAt: 2020-08-06
---

タイトルだと少しわかりにくいですが、下記の画像を見ていただければ伝わるはずです。クレジットカードの入力でみかけることが多いでしょうか。

![4つごとに空白のあるテキスト入力フォーム](/assets/img/posts/js-input-text-politespace/sample.png)

空白のある箇所ごとに `<input type="text">` をわけるような実装でもよさそうではありそうですが、デザイン上 1 つのフォームで実装する必要がでてくることもあります。

UX が向上しそうなのですが日本語圏ではかな入力時になにも入力されない状態が発生しまうので、入力可能な文字列次第では微妙になる場合もありそうな気はしています。

## Cleave.js を使う

- [Cleave.js](https://github.com/nosir/cleave.js/)

上記のライブラリを使えば特に問題なく実装できそうです。

```
yarn add -E cleave.js
yarn add -DE @types/cleave.js
```

```tsx
<Cleave options={{ blocks: [4, 4, 4] }} />
```

`CleaveOptions` での設定が豊富なのでほとんどのケースはこれで対応できるはずです。

## 自分で頑張る

自分で頑張る場合は少し面倒です。

```tsx
import React, { FC, useState, useCallback, useRef } from "react";

const InputText: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const handleChange = useCallback(() => {
    const target = inputRef.current;
    if (target && target.value.length >= 0) {
      const chunkedValue =
        target.value.match(/[\da-zA-Z]{1,4}/g)?.join(" ") ?? "";
      setValue(chunkedValue);
    }
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      maxLength={4 * 3 + 3}
    />
  );
};

export default InputText;
```

上記のコードは一見うまくいきそうに思えますが、これはカーソル位置を移動して backspace をしたときに正しく機能しません。

![カーソル移動後のbackspaceで正しく動作しないテキスト入力フォームの動作](/assets/img/posts/js-input-text-politespace/bug.gif)

1. 4 つ区切りになっていない
2. カーソルが空白の箇所で最後尾にとんでしまう

この 2 点が問題になります。

```tsx
import React, { FC, useState, useCallback, useRef, useEffect } from "react";

const InputText: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [prevPosition, setPrevPosition] =
    useState<HTMLInputElement["selectionEnd"]>(null);

  const handleChange = useCallback(() => {
    const target = inputRef.current;
    if (target === null) return;

    const chunkedValue = target.value
      .replace(/[^\da-zA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setPrevPosition(target.selectionEnd);
    setValue(chunkedValue);
  }, []);

  useEffect(() => {
    const target = inputRef.current;
    if (target === null || prevPosition === null) return;

    const currentPosition = target.selectionEnd;
    if (currentPosition === null || prevPosition === null) return;

    // 半角空白が追加されたときのカーソルを補正する
    const nextPositionDiff =
      prevPosition + 1 === currentPosition &&
      value.charAt(prevPosition - 1) === " "
        ? 1
        : 0;

    target.selectionEnd = prevPosition + nextPositionDiff;
  }, [prevPosition, value]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      maxLength={4 * 3 + 3}
    />
  );
};

export default InputText;
```

この方法では `chunkedValue` の文字列が変化するため、削除時にカーソルが最後尾に飛ばされます。そのため `useEffect` で `selectionEnd` の補正をしています。

とりあえず作ってはみたのですが、ちょっと自信がありません。素直にプラグインを使ったほうが良さそうです。
