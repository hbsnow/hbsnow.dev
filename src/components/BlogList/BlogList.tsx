import { memo } from "react";

import type { MarkdownInstance } from "astro";

import type { Frontmatter } from "../../types/astro";
import { formattedDate } from "../../utils/formattedDate";
import { PostCard } from "../PostCard";
import styles from "./styles.module.css";

type Props = {
  posts: MarkdownInstance<Frontmatter>[];
};

const Component = (props: Props): JSX.Element => {
  const { posts } = props;

  return (
    <div className={styles.root} role="list">
      {posts.map((post) => {
        if (!post.url) {
          throw new Error("url is not generated");
        }

        return (
          <PostCard
            key={post.url}
            title={post.frontmatter.title}
            url={post.url}
            tags={post.frontmatter.tags}
            createdAt={formattedDate(post.frontmatter.createdAt)}
            updatedAt={formattedDate(post.frontmatter.updatedAt)}
            className={styles.postCard}
          />
        );
      })}
    </div>
  );
};

export const BlogList = memo(Component);
