import type { Activity } from ".";

export const events: Activity[] = [
  {
    title: "【オフライン@福岡】俺たちのフロントエンド”大”自慢大会",
    date: "2023-04-14",
    url: "https://findy.connpass.com/event/278455/",
  },
  {
    title:
      "フロントエンドエンジニアぶっちゃけトーク会〜MAD事業部のフロントエンド開発のイマ〜",
    date: "2022-05-31",
    url: "https://dev.classmethod.jp/news/220531-akiba-mad",
    mediaUrl: "https://youtube.com/watch?v=nAOE-KBFal4",
  },
].map((v) => ({ type: "event", ...v }));
