import type { Activity } from ".";

export const events: Activity[] = [
  {
    title:
      "フロントエンドエンジニアぶっちゃけトーク会〜MAD事業部のフロントエンド開発のイマ〜",
    date: "2022-05-31",
    url: "https://dev.classmethod.jp/news/220531-akiba-mad",
    mediaUrl: "https://youtube.com/watch?v=nAOE-KBFal4",
  },
].map((v) => ({ type: "event", ...v }));
