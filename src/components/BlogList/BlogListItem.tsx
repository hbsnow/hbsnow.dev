import type { MarkdownInstance } from "astro";
import clsx from "clsx";

import { Link } from "../../cores/Link";
import { TagList } from "../TagList";
import styles from "./BlogListItem.module.css";
import type { Frontmatter } from "@/types/astro";
import { formatDate } from "@/utils/formatDate";

type Props = Readonly<{
  post: MarkdownInstance<Frontmatter>;
}>;

export const BlogListItem = (props: Props) => {
  const { post } = props;

  return (
    <div className={styles.root}>
      <div className={styles.times}>
        <div
          className={clsx(styles.createdAt, {
            [styles.disabled]: !!post.frontmatter.createdAt,
          })}
        >
          <time aria-label="作成日" dateTime={post.frontmatter.createdAt}>
            {formatDate(post.frontmatter.createdAt)}
          </time>
        </div>
        {post.frontmatter.updatedAt && (
          <div className={styles.updatedAt}>
            <time aria-label="更新日" dateTime={post.frontmatter.updatedAt}>
              {formatDate(post.frontmatter.updatedAt)}
            </time>
          </div>
        )}
      </div>
      <h2 className={styles.title} itemProp="headline">
        <Link href={post.url}>{post.frontmatter.title}</Link>
      </h2>

      <TagList tags={post.frontmatter.tags} />
    </div>
  );
};
