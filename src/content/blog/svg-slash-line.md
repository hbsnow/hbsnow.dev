---
layout: "@/layouts/BlogPostLayout.astro"
title: 斜線を含む SVG のコンポーネントを作成する
tags: [svg, react]
description: 斜線を含む SVG のコンポーネントを作成する方法。
createdAt: 2020-10-24
---

## まとめ

- strokeはpathの中心に線を引くので、図形によっては欠けることがある
- pathで2つの線を時計まわりと反時計まわりとそれぞれ異なる方向にひき、fillすることで線を引くこともできる

## 斜線に stroke を使う

![理想の三角形](/assets/img/posts/svg-slash-line/triangle-0.png)

上のような三角形を作成するために `stroke` を使ってコンポーネントを作ってみます。

```tsx
import React, { useMemo } from "react";

type Props = {
  width: number;
  height: number;
  strokeWidth?: number;
};

export const Triangle: React.FC<Props> = (props) => {
  const { width, height, strokeWidth = 2 } = props;

  const d = useMemo(() => {
    const x = width;
    const y = height;

    return `M ${x} 0 H ${width} V ${height} H 0 L 0 ${y} L ${x} 0 Z`;
  }, [height, width]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      stroke="#000"
      fill="transparent"
    >
      <path d={d} />
    </svg>
  );
};
```

このコンポーネントを表示させると、次のような斜線部分の太い三角形になってしまいます。

![斜線の太い三角形](/assets/img/posts/svg-slash-line/triangle-1.png)

これは斜線が太くなったわけではなく、直線部分がviewBoxからはみ出てしまったため欠けている状態になっていることが原因です。viewBoxを少し大きくしてみると、期待する図形が表示されることを確認できます。

これはSVGのpathのstrokeがpathの中心から描かれることが原因です。strokeはpathの内側や外側を通るような指定をすることが今のところできません。つまり線の欠けない正しいpathにするためには、次のようなコードにする必要があります。

```tsx
const d = useMemo(() => {
  const x = width - strokeWidth / 2;
  const y = height - strokeWidth / 2;

  return `M ${x} 0 H ${x} V ${y} H 0 L 0 ${y} L ${x} 0 Z`;
}, [height, width, strokeWidth]);
```

## 線を path で描く

strokeを使用せず、2本の線を引いてfillしてみます。

```tsx
import React, { useMemo } from "react";

type Props = {
  width: number;
  height: number;
  strokeWidth?: number;
};

export const Triangle: React.FC<Props> = (props) => {
  const { width, height, strokeWidth = 2 } = props;

  const d = useMemo(() => {
    const x = width;
    const y = height;
    const innerX = x + strokeWidth / 2;
    const innerY = y + strokeWidth / 2;
    const innerWidth = width - strokeWidth;
    const innerHeight = height - strokeWidth;
    return `
      M ${x} 0 H ${width} V ${height} H 0 L 0 ${y} L ${x} 0 Z
      M ${innerX} ${strokeWidth} L ${strokeWidth} ${innerY} H ${strokeWidth} V ${innerHeight} H ${innerWidth} V ${strokeWidth} L ${innerX} ${strokeWidth} Z
    `;
  }, [height, width, strokeWidth]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      width={width}
      height={height}
      fill="#000"
    >
      <path d={d} />
    </svg>
  );
};
```

![斜線の太い三角形](/assets/img/posts/svg-slash-line/triangle-2.png)

この方法でも三角形を描くことができます。
