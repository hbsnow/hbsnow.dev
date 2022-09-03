---
layout: "@/layouts/BlogPostLayout.astro"
title: renovate しているリポジトリを Vercel にデプロイする
tags: [vercel]
description: renovate しているリポジトリを Vercel にデプロイするときの注意点。
createdAt: 2020-05-04
updatedAt: 2020-06-27
---

## まとめ

- 同時刻に renovate の大量の PR でがでていたため Vercel のビルドが詰まっていた
- renovate の設定を変更
  - `master` ではなく `chore/renovate` ブランチにオートマージ
  - スケジュールを平日にのみ稼働させる

## 問題

このサイトは [renovate](https://renovatebot.com/) を使って依存パッケージの自動更新をしていて、サイトのデプロイ先を [Vercel](https://vercel.com/) にしています。

当時の renovate.json の設定は以下です。

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

結果的にこの設定は非常によくなくて、週末の特定時間に master へのマージが多発したためキューの大渋滞を起こしていました。

## renovate で master に直接マージしない

原因は特定のタイミングで master へのマージが一気に行われることです。平日まめに確認できないのでオートマージは維持させたいという事情があります。

そこでマージ先を直接 master ではなく `chore/renovate` というブランチを作り、そこにマージしていくように変更しました。

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

直接 master にマージされなくなったため、major アップデート以外と devDependencies のすべてをオートマージするように変更しています。また、私が稼働する週末には動作せず、平日にのみ動作するようにしました。

## 結果

1. renovate が平日 `chore/renovate` にオートマージ
1. renovate が dependencies の major アップデートを `chore/renovate` に PR を出す
1. 私が `chore/renovate` への PR をレビューしてマージ
1. 私が `chore/renovate` から `master` に PR を出して、レビューしてマージ

minor のアップデートもオートマージになったので結果的に作業量が大きく減りました。

今回の例ではださなかったけど、[セマンティックバージョニング](https://semver.org/) になっていない、例えば [TypeScript](https://www.typescriptlang.org/) のようなパッケージには注意が必要になります。renovate の設定はパッケージごとに `packageRules` でグループ化することで細かく設定できるので、プロジェクトにあった設定をするとよさそうです。
