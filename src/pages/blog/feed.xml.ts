import dayjs from "dayjs";

import { GlobResult, mapGlobResult } from "@/utils/feed";
import { sortPostByCreatedAt } from "@/utils/sortPostByCreatedAt";

export const get = async () => {
  const items = await mapGlobResult(
    import.meta.glob("./**/*.md") as GlobResult
  );

  const posts = sortPostByCreatedAt(items);

  const rssItems = posts
    .map((post) => {
      const id = `tag:hbsnow.dev,${dayjs(post.frontmatter.createdAt).format(
        "YYYY-MM-DD"
      )}:${post.url}`;

      const updated = post.frontmatter.updatedAt
        ? post.frontmatter.updatedAt
        : post.frontmatter.createdAt;

      return `
<entry>
  <title>${post.frontmatter.title}</title>
  <id>${id}</id>
  <link href="https://hbsnow.dev/blog${post.url}" />
  <summary>${post.frontmatter.description}</summary>
  <published>${post.frontmatter.createdAt}</published>
  <updated>${updated}</updated>
</entry>
`;
    })
    .join("");

  return {
    body: `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
  <id>tag:hbsnow.dev,2022-09-03:/feed</id>
  <title>hbsnow.dev blog feed</title>
  <link href="https://hbsnow.dev/blog" />
  <link rel="self" type="application/atom+xml" href="https://hbsnow.dev/blog/feed.xml" />
  <updated>${posts[0].frontmatter.createdAt}</updated>
  <author>
    <name>hbsnow</name>
  </author>
  ${rssItems}
</feed>
`,
  };
};
