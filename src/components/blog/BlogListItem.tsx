import React from "react";

import classNames from "classnames";
import Link from "next/link";

import { TagType } from "../../elements/icon/Icon";
import { useFormattedDate } from "../../hooks/date";
import { BlogType } from "../../modules/blog";
import { mediaQuery } from "../../styles/const";
import TagList from "../tag/TagList";

type Props = Readonly<{
  post: BlogType;
  preferredTag?: TagType;
}>;

const BlogListItem = (props: Props): JSX.Element => {
  const { post, preferredTag } = props;

  const createdAt = useFormattedDate(post?.createdAt);
  const updatedAt = useFormattedDate(post?.updatedAt);

  if (!post?.title) {
    throw new Error("Error: title が指定されていません。");
  }

  if (!post?.createdAt) {
    throw new Error("Error: createdAt が指定されていません。");
  }

  return (
    <div className={classNames("blogListItem", { update: Boolean(updatedAt) })}>
      <div className="title">
        <Link href={`/blog/${encodeURIComponent(post.slug)}/`}>
          <a>{post.title}</a>
        </Link>
      </div>
      <div className="separator">
        <hr className="line" />
      </div>
      {post.updatedAt && (
        <div className="updatedAt">
          <time dateTime={post.updatedAt}>{updatedAt}</time>
        </div>
      )}
      <div className="createdAt">
        <time dateTime={post.createdAt}>{createdAt}</time>
      </div>
      {!!post.tags && (
        <div className="tags">
          <TagList tagList={post.tags} preferredTag={preferredTag} />
        </div>
      )}
    </div>
  );
};

export default BlogListItem;
