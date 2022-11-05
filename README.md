# hbsnow.dev

https://hbsnow.dev

[![](https://github.com/hbsnow/hbsnow.dev/workflows/Lint%20and%20Test/badge.svg)](https://github.com/hbsnow/hbsnow.dev/actions?query=workflow%3A%22Lint+and+Test%22)

## Run

```
npm run dev
```

## DevelopersIO から記事の追加

全件取得はできないので、local で json として保持しておき新規の記事があれば追加する。ただし Node 18 以上が必要なので注意。

```
node tools/getDevelopersIo.mjs
```
