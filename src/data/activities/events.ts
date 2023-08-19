import type { Activity } from ".";

export const events: Activity[] = [
  {
    title: "クラスメソッドの最新開発ノウハウを学ぶ勉強会 〜エンジニア編〜",
    date: "2023-08-04",
    url: "https://classmethod.connpass.com/event/290312/",
    slideUrl:
      "https://speakerdeck.com/hbsnow/hurontoendoenziniagagu-ke-enziniatosukuramudeban-zou-siteiruhua",
  },
  {
    title: "Front-End Deep Dive Online",
    date: "2023-06-22",
    url: "https://anotherworks.connpass.com/event/285095/",
    slideUrl:
      "https://speakerdeck.com/hbsnow/ju-da-tablenopahuomansuwogai-shan-suru",
  },
  {
    title: "【オフライン@福岡】俺たちのフロントエンド”大”自慢大会",
    date: "2023-04-14",
    url: "https://findy.connpass.com/event/278455/",
    slideUrl:
      "https://speakerdeck.com/hbsnow/oke-sannoensiniatosukuramute-bing-zou-siteiruhua",
  },
  {
    title:
      "フロントエンドエンジニアぶっちゃけトーク会〜MAD事業部のフロントエンド開発のイマ〜",
    date: "2022-05-31",
    url: "https://dev.classmethod.jp/news/220531-akiba-mad",
    mediaUrl: "https://youtube.com/watch?v=nAOE-KBFal4",
  },
].map((v) => ({ type: "event", ...v }));
