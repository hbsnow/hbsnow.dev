import { memo } from "react";

import type { CollectionEntry } from "astro:content";

import styles from "./BlogList.module.css";
import { BlogListItem } from "./BlogListItem";

type Props = {
  posts: CollectionEntry<"blog">[];
};

const Component = (props: Props) => {
  const { posts } = props;

  return (
    <div className={styles.root} role="list">
      {posts.map((post) => {
        return (
          <div key={post.id} role="listitem">
            <BlogListItem post={post} />
          </div>
        );
      })}
    </div>
  );
};

export const BlogList = memo(Component);
