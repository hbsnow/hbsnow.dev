import developersio from "./developersio.json";
import type { Activity } from "@/data/activities";

export const feeds: Activity[] = [
  ...developersio.items.map((item) => ({
    type: "blog" as const,
    category: "developersio" as const,
    url: item.url,
    title: item.title,
    date: item.createdAt,
  })),
];
