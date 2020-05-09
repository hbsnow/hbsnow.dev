---
title: renovate しているリポジトリを Vercel にデプロイする
tags: [vercel]
description: renovate しているリポジトリを Vercel にデプロイするときの注意点。
createdAt: 2020-05-04
---

このサイトは [renovate](https://renovatebot.com/) を使って依存パッケージの自動更新をしていて、サイトのデプロイ先を [Vercel](https://vercel.com/) にしています。

当時の renovate.json の設定は以下。

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

この設定は非常によくなくて、何がまずいかというと週末の特定時間に master へのマージが多発するため、キューが詰まります。

## renovate で master に直接マージしない

原因は特定のタイミングで master へのマージが一気に行われることです。簡単な対応策としては schedule の調整になるのですが、平日まめに確認できないので週末だけのオートマージは維持させたいという事情がありました。

そこでマージ先を直接 master ではなく `chore/renovate` というブランチを作り、そこにマージしていくように変更しました。

```json
{
  "extends": ["config:base"],
  "timezone": "Asia/Tokyo",
  "labels": ["renovate"],
  "schedule": "every weekend",
  "baseBranches": ["chore/renovate"],
  "packageRules": [
    {
      "updateTypes": ["minor", "patch", "pin", "digest"],
      "automerge": true
    }
  ]
}
```

直接 master にマージされなくなったため、major アップデート以外はすべてオートマージするように変更しています。

## 結果

1. renovate が patch/minor のアップデートを `chore/renovate` にオートマージ
1. renovate が major アップデートを `chore/renovate` に PR を出す
1. 私が `chore/renovate` への PR をレビューしてマージ
1. 私が `chore/renovate` から `master` に PR を出して、レビューしてマージ

minor のアップデートもオートマージになったので結果的に作業量が大きく減りました。

今回の例ではださなかったけど、[セマンティックバージョニング](https://semver.org/) になっていない、例えば [TypeScript](https://www.typescriptlang.org/) のようなパッケージには注意が必要になります。renovate の設定はパッケージごとに細かく設定できるので、プロジェクトにあった設定をしていきましょう。
