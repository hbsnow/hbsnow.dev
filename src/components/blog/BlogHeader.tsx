import React from "react";

import classNames from "classnames";

import { useFormattedDate } from "../../hooks/date";
import { BlogType } from "../../modules/blog";
import TagList from "../tag/TagList";

type Props = Readonly<{
  post: BlogType;
}>;

const BlogHeader = (props: Props): JSX.Element => {
  const { post } = props;

  const createdAt = useFormattedDate(post.createdAt);
  const updatedAt = useFormattedDate(post.updatedAt);

  return (
    <header
      className={classNames("header", {
        update: Boolean(post.updatedAt),
      })}
    >
      <h1 className="title">{post.title}</h1>

      <div className="date">
        <div className="createdAt">
          <time dateTime={createdAt}>{createdAt}</time>
        </div>
        {updatedAt && (
          <div className="updatedAt">
            <time dateTime={updatedAt}>{updatedAt}</time>
          </div>
        )}
      </div>

      <TagList tagList={post.tags} />
    </header>
  );
};

export default BlogHeader;
