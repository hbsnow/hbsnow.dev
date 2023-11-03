---
layout: "@/layouts/BlogPostLayout.astro"
title: renovate しているリポジトリを Vercel にデプロイする
tags: [vercel]
description: renovate しているリポジトリを Vercel にデプロイするときの注意点。
createdAt: 2020-05-04
updatedAt: 2020-06-27
---

## まとめ

- 同時刻にrenovateの大量のPRでがでていたためVercelのビルドが詰まっていた
- renovateの設定を変更
  - `master` ではなく `chore/renovate` ブランチにオートマージ
  - スケジュールを平日にのみ稼働させる

## 問題

このサイトは [renovate](https://renovatebot.com/) を使って依存パッケージの自動更新をしていて、サイトのデプロイ先を [Vercel](https://vercel.com/) にしています。

当時のrenovate.jsonの設定は以下です。

```json
{
  "extends": ["config:base"],
  "timezone": "Asia/Tokyo",
  "labels": ["renovate"],
  "schedule": "every weekend",
  "packageRules": [
    {
      "depTypeList": ["devDependencies"],
      "automerge": true
    }
  ]
}
```

結果的にこの設定は非常によくなくて、週末の特定時間にmasterへのマージが多発したためキューの大渋滞を起こしていました。

## renovate で master に直接マージしない

原因は特定のタイミングでmasterへのマージが一気に行われることです。平日まめに確認できないのでオートマージは維持させたいという事情があります。

そこでマージ先を直接masterではなく `chore/renovate` というブランチを作り、そこにマージしていくように変更しました。

```json
{
  "extends": ["config:base"],
  "timezone": "Asia/Tokyo",
  "labels": ["renovate"],
  "schedule": "every weekday",
  "baseBranches": ["chore/renovate"],
  "packageRules": [
    {
      "updateTypes": ["minor", "patch", "pin", "digest"],
      "automerge": true
    },
    {
      "depTypeList": ["devDependencies"],
      "automerge": true
    }
  ]
}
```

直接masterにマージされなくなったため、majorアップデート以外とdevDependenciesのすべてをオートマージするように変更しています。また、私が稼働する週末には動作せず、平日にのみ動作するようにしました。

## 結果

1. renovateが平日 `chore/renovate` にオートマージ
1. renovateがdependenciesのmajorアップデートを `chore/renovate` にPRを出す
1. 私が `chore/renovate` へのPRをレビューしてマージ
1. 私が `chore/renovate` から `master` にPRを出して、レビューしてマージ

minorのアップデートもオートマージになったので結果的に作業量が大きく減りました。

今回の例ではださなかったけど、[セマンティックバージョニング](https://semver.org/) になっていない、例えば [TypeScript](https://www.typescriptlang.org/) のようなパッケージには注意が必要になります。renovateの設定はパッケージごとに `packageRules` でグループ化することで細かく設定できるので、プロジェクトにあった設定をするとよさそうです。
