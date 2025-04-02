---
title: useEffect 内の非同期処理で local state を変更するときの注意点
tags: [react]
description: useEffect 内の非同期処理で local state を変更するとき、コンポーネントがマウントされているかのチェックが必要になる。
createdAt: 2020-11-29
---

## メモリリークで怒られるパターン

`useEffect` 内で非同期処理を書くと次のようなエラーで怒られることがあります。

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

これはコンポーネントがアンマウントされた状態で、アンマウントされたコンポーネントのlocal stateを変更したときに発生します。

人為的にこのエラーを引き起こしてみます。

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

表示直後、5秒後に表示されている数値が1にカウントアップするだけのコンポーネントです。toggleのボタンをクリックするとCountUpのコンポーネントのマウント状態を切り替えます。そのため、render直後から5秒以内にtoggleボタンを押すことで先述のエラーが表示されるはずです。

これを防ぐにはCountUp.tsxの `useEffect` のcleanupで `clearTimeout` をするだけです。

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

コンポーネントがマウントされていないときに、local stateの変更をしなければエラーは発生しません。つまり、`clearTimeout` をしなくてもマウントされているかどうかのフラグによってエラーを回避できます。`setTimeout` ではあまり次のように書く意味はありませんが、Promiseがキャンセルできないときにはフラグが必要なります。

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

レースコンディションで起こる問題については次の記事が詳しいです。

https://overreacted.io/a-complete-guide-to-useeffect/

ただし、例えば叩いた回数を返すAPIがあり、その結果を表示させるような場合。そのAPIを連読で叩き、一度目のAPI呼び出しの結果が二度目のAPIの戻りよりも遅れて返ってきた場合、`isMounted()` で判定するだけでは意図しない結果が表示されてしまいます。

## useAsyncFn

`isMounted()` は便利なのですが `useEffect` 内でAPIを叩くようなとき、loadingとerrorの状態なども持たせたくなるため、やや大げさなコードになってしまいます。

```tsx
import React, { useState, useCallback, useEffect } from "react";
import { useMountedState } from "react-use";

export const Todo: React.FC = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const isMounted = useMountedState();

  const fetchTodo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://example.com");
      const result = await response.text();
      if (isMounted()) {
        setResult(result);
      }
    } catch (err) {
      if (isMounted()) {
        setError(err);
      }
    } finally {
      if (isMounted()) {
        setLoading(false);
      }
    }
  }, [isMounted]);

  useEffect(() => {
    fetchTodo();
  }, []);

  if (loading) {
    return <>Loading</>;
  }
  return <>{result}</>;
};
```

これをreact-useの [`useAsyncFn`](https://github.com/streamich/react-use/blob/master/docs/useAsyncFn.md) で書き換えると次のようにすっきりと記述できます。

```tsx
import React, { useEffect } from "react";
import { useAsyncFn } from "react-use";

export const Todo: React.FC = () => {
  const [state, fetchTodo] = useAsyncFn(async () => {
    const response = await fetch("https://example.com");
    const result = await response.text();
    return result;
  }, []);

  useEffect(() => {
    fetchTodo();
  }, []);

  if (state.loading) {
    return <>Loading</>;
  }
  return <>{state.value}</>;
};
```

ただし、`useAsyncFn` の第二引数にはESLintの `react-hooks/exhaustive-deps` がきかないので注意が必要です。この問題は [`additionalHooks` の設定を追加することで解決](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)します。

```json
{
  "rules": {
    // ...
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        "additionalHooks": "(useAsyncFn)"
      }
    ]
  }
}
```
