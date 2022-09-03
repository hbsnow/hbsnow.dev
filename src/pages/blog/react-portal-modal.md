---
layout: "@/layouts/BlogPostLayout.astro"
title: React の portal を使ってスタック可能なモーダルを作成する
tags: [react]
description: React の portal を使ってスタック可能なモーダルを作成する。
createdAt: 2020-04-25
updatedAt: 2020-04-29
---

React で普通のモーダルを作るのであれば、素直にスターが多めの以下を使うのがよさそう。

- https://github.com/reactjs/react-modal

ただモーダルをスタック、ようするにモーダルの中からモーダルを追加で呼び出したりしたくなったりした場合、このライブラリだと難しくなりそうです。

そのため、スタック可能なモーダルのサンプルを自作してみました。

- https://github.com/hbsnow/react-portal-stackable-modal
- [サンプル](https://hbsnow-react-portal-stackable-modal.netlify.app/)

作成したコードと動作サンプルは上記のページにあげてあります。

## React の portal でモーダルを作る

モーダルを出すためには画面をすべて覆う必要があります。しかし `position: fixed` で覆おうとしても、途中のコンポーネントに `overflow: hidden` などの設定があるとモーダルが画面全体を覆うことができなくなります。

- https://ja.reactjs.org/docs/portals.html

こういった問題を解決するために React では、子のコンポーネントを親の DOM 階層下以外の場所に描画できる portal というものが用意されています。

```tsx
import React, { FC, useRef, useState, useEffect } from "react";

import { createPortal } from "react-dom";

const Modal: FC = () => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("#__next");
    setMounted(true);
  }, []);

  return mounted ? createPortal(<>ここにモーダル</>, ref.current) : null;
};

export default Modal;
```

簡略化していますが Next.js だとモーダル用のコンポーネントはこんな感じになります。

## モーダルをスタックさせる

モーダルをスタックさせるには、どこかでモーダルとその順序をもつ配列を何らかの形でもつ必要があります。

[store に React のコンポーネントをそのまま配列に入れて順番を保持する](https://github.com/reduxjs/redux/issues/1248)ようなことは推奨されていません。

なので、モーダル用の props をつくってそれを配列としてもつか、そういったことも難しいようであれば Enum とか Union 型を props で渡して条件分岐させる方法が考えられます。ここのサンプルでは後者を採用しました。

```tsx
import React, { useContext } from 'react'

type Props = {
  type: string
}

const ModalContent: FC<Props> = ({ type }) => {
  switch (type) {
    case 'DIALOG_NAME':
    default:
      return (
        <button onClick={(): void => console.log('close'))}>
          close
        </button>
      )
  }
}

export default ModalContent
```

`createPortal` に渡すための `ModalContent` を作ってこの中に `props.type` を渡して出すダイアログの中身を構築しています。

ここではまだ閉じる機能の実装はしていません。

## モーダルの情報をもった配列の変更

モーダルの状態をもった配列はどのコンポーネントからも変更できる必要があります。Redux を使っていればそれでいいし、今回のようなサンプル程度のものであれば `useReducer` と `useContext` を使えばいいでしょう。

```tsx
import { createContext, Dispatch } from "react";

export const Context = createContext<{
  state: StateType;
  dispatch: Dispatch<any>;
}>(undefined);

export type StateType = {
  modals: string[];
};

export const initialState: StateType = {
  modals: [],
};

export const reducer = (state: StateType, action): StateType => {
  switch (action.type) {
    case "PUSH": {
      const modals = [...state.modals];
      modals.push(action.modal);

      return { modals };
    }
    case "SHIFT": {
      const modals = [...state.modals];
      modals.shift();

      return { modals };
    }
    case "UNSHIFT": {
      const modals = [...state.modals];
      modals.unshift(action.modal);

      return { modals };
    }
    default:
      throw new Error("未定義");
  }
};
```

サンプルで用意したのは PUSH, SHIFT, UNSHIFT の 3 つ。配列操作の名前の通りの挙動なので特に説明はいらないはず。

## モーダルを呼び出す

モーダルを呼び出すには次のように dispatch するだけです。

```tsx
import React, { useContext } from "react";

import { Context } from "../modules";

const ExampleButton: FC = () => {
  const { dispatch } = useContext(Context);

  return (
    <button
      onClick={(): void =>
        dispatch({
          type: "PUSH",
          modal: "DIALOG_NAME",
        })
      }
    >
      add modal
    </button>
  );
};

export default Page;
```
