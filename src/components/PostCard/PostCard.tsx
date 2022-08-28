import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import type { TagType } from "../../cores/Icon";
import { Link } from "../../cores/Link";
import { TagList } from "../TagList";
import styles from "./styles.module.css";

type Props = Readonly<
  {
    title: string;
    url: string;
    tags: TagType[];
    createdAt: string;
    updatedAt?: string | undefined;
  } & ComponentPropsWithoutRef<"div">
>;

export const PostCard = (props: Props) => {
  const { title, url, tags, createdAt, updatedAt, className, ...rest } = props;

  return (
    <div className={clsx(styles.root, className)} {...rest}>
      <div className={styles.times}>
        <div
          className={clsx(styles.createdAt, { [styles.disabled]: !!updatedAt })}
        >
          <time aria-label="作成日" dateTime={createdAt}>
            {createdAt}
          </time>
        </div>
        {updatedAt && (
          <div className={styles.updatedAt}>
            <time aria-label="更新日" dateTime={updatedAt}>
              {updatedAt}
            </time>
          </div>
        )}
      </div>
      <h2 className={styles.title} itemProp="headline">
        <Link href={url}>{title}</Link>
      </h2>

      <TagList tags={tags} />
    </div>
  );
};
