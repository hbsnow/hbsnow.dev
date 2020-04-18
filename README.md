# hbsnow.dev

https://hbsnow.dev

[![](https://github.com/hbsnow/hbsnow.dev/workflows/Lint%20and%20Test/badge.svg)](https://github.com/hbsnow/hbsnow.dev/actions?query=workflow%3A%22Lint+and+Test%22)

## Run

```
NODE_ENV=development yarn dev

# webpackのパフォーマンス計測をする場合
NODE_ENV=development MEASURE=true yarn build
```

## Update models

```
npx contentful-typescript-codegen --output src/models/contentful.d.ts
```
