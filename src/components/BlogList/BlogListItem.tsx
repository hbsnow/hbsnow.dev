import type { CollectionEntry } from "astro:content";
import clsx from "clsx";

import styles from "./BlogListItem.module.css";
import { TagList } from "@/components/TagList";
import { Link } from "@/cores/Link";
import { formatDate } from "@/utils/formatDate";

type Props = Readonly<{
  post: CollectionEntry<"blog">;
}>;

export const BlogListItem = (props: Props) => {
  const { post } = props;

  return (
    <div className={styles.root}>
      <div className={styles.times}>
        <div
          className={clsx(styles.createdAt, {
            [styles.disabled]: !!post.data.createdAt,
          })}
        >
          <time
            aria-label="作成日"
            dateTime={post.data.createdAt.toISOString()}
          >
            {formatDate(post.data.createdAt)}
          </time>
        </div>
        {post.data.updatedAt && (
          <div className={styles.updatedAt}>
            <time
              aria-label="更新日"
              dateTime={post.data.updatedAt.toISOString()}
            >
              {formatDate(post.data.updatedAt)}
            </time>
          </div>
        )}
      </div>
      <h2 className={styles.title} itemProp="headline">
        <Link href={`/blog/${post.id}`}>{post.data.title}</Link>
      </h2>

      <TagList tags={post.data.tags} />
    </div>
  );
};
