// @ts-check
import { writeFile } from "fs/promises";

import dayjs from "dayjs";
import { XMLParser } from "fast-xml-parser";
import fetch from "node-fetch";

export const getDevelopersIo = async () => {
  const json = await import("../src/data/feeds/developersio.json", {
    assert: { type: "json" },
  });

  const response = await fetch(
    "https://dev.classmethod.jp/author/takahashi-yuki/feed/"
  );

  if (!response.ok) {
    throw new Error("response error");
  }

  const feed = await response.text();
  const parser = new XMLParser();
  const parsedFeed = parser.parse(feed);

  let result = [...json.default.items];
  for (const feedItem of parsedFeed.rss.channel.item) {
    if (!json.default.items.some((item) => item.guid === feedItem.guid)) {
      const { title, link: url, guid } = feedItem;
      const createdAt = dayjs(feedItem.pubDate).format("YYYY-MM-DD");
      result.unshift({ title, url, createdAt, guid });
      console.log(`[New] ${createdAt} ${feedItem.title}`);
    }
  }

  if (json.default.items.length === result.length) {
    console.log("No new articles");
    return;
  }

  await writeFile(
    "./src/data/feeds/developersio.json",
    JSON.stringify({ items: result })
  );
  console.log(
    `Success! Add ${result.length - json.default.items.length} files`
  );
};

getDevelopersIo();
