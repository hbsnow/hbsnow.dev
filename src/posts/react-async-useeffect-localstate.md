---
title: useEffect 内の非同期処理で local state を変更するときの注意点
tags: [react]
description: useEffect 内の非同期処理で local state を変更するとき、コンポーネントがマウントされているかのチェックが必要になる。
createdAt: 2020-11-29
---

## メモリリークで怒られるパターン

`useEffect` 内で非同期処理を書くと以下のようなエラーで怒られることがあります。

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

これはコンポーネントがアンマウントされた状態で、アンマウントされたコンポーネントの local state を変更したときに発生します。

実際に人為的にこのエラーを引き起こしてみます。

```tsx
// App.tsx
import React, { useState } from "react";
import { CountUp } from "./CountUp";

const App: React.FC = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && <CountUp />}
      <button onClick={() => setShow((v) => !v)}>toggle</button>
    </>
  );
};

export default App;
```

```tsx
// CountUp.tsx
import React, { useEffect, useState } from "react";

export const CountUp: React.FC = () => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setNum();
    }, 5000);
  }, []);

  return (
    <div>
      <p>5s後にカウント</p>
      <p>count: {num}</p>
    </div>
  );
};
```

表示直後、5 秒後に表示されている数値が 1 にカウントアップするだけのコンポーネントです。toggle のボタンをクリックすると CountUp のコンポーネントのマウント状態を切り替えます。そのため、render 直後から 5 秒以内に toggle ボタンを押すことで先述のエラーが表示されるはずです。

これを防ぐには CountUp.tsx の `useEffect` の cleanup で `clearTimeout` をするだけです。

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setNum(1);
  }, 5000);

  return (): void => {
    clearTimeout(timer);
  };
}, []);
```

コンポーネントがマウントされていないときに、local state の変更をしなければエラーは発生しません。つまり、`clearTimeout` をしなくてもマウントされているかどうかのフラグによってエラーを回避できます。`setTimeout` ではあまり次のように書く意味はありませんが、Promise がキャンセルできないときにはフラグが必要なります。

```tsx
useEffect(() => {
  let isMounted = true;
  setTimeout(() => {
    if (isMounted) {
      setNum(1);
    }
  }, 5000);

  return (): void => {
    isMounted = false;
  };
}, []);
```

また、[react-use](https://github.com/streamich/react-use) でも [`useMountedState`](https://github.com/streamich/react-use/blob/master/docs/useMountedState.md) といったものが用意されていて、これは次のように使用できます。非同期関数であれば `useEffect` の外に出せるのでコードの見通しが良くなりそうです。

```tsx
const isMounted = useMountedState();
useEffect(() => {
  setTimeout(() => {
    if (isMounted()) {
      setNum(1);
    }
  }, 5000);
}, []);
```

## レースコンディションで思った値と別の値になるパターン

レースコンディションで起こる問題については以下の記事が詳しいです。

- [A Complete Guide to useEffect](https://iqkui.com/a-complete-guide-to-useeffect/)

対応としてはメモリリークで怒られるパターンと同じでよさそうです。
