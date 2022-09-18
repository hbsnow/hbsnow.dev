import { memo } from "react";

import type { MarkdownInstance } from "astro";

import type { Frontmatter } from "../../types/astro";
import styles from "./BlogList.module.css";
import { BlogListItem } from "./BlogListItem";

type Props = {
  posts: MarkdownInstance<Frontmatter>[];
};

const Component = (props: Props): JSX.Element => {
  const { posts } = props;

  return (
    <div className={styles.root} role="list">
      {posts.map((post) => {
        return (
          <div key={post.url} role="listitem">
            <BlogListItem post={post} />
          </div>
        );
      })}
    </div>
  );
};

export const BlogList = memo(Component);
