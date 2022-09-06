import developersio from "./developersio.json";

export type Feed = {
  type: "developersio";
  title: string;
  createdAt: string;
  url: string;
};

export const feed: Feed[] = [
  ...developersio.items.map(({ guid: _, ...rest }) => ({
    type: "developersio" as const,
    ...rest,
  })),
];
