import React, { FC } from "react";

import { TagType } from "../../elements/icon/Icon";
import { BlogType } from "../../modules/blog";
import BlogListItem from "./BlogListItem";

type Props = {
  blogList: BlogType[];
  preferredTag?: TagType;
};

const BlogList: FC<Props> = ({ blogList, preferredTag }) => {
  return (
    <ul className="blogList">
      {blogList?.map((post) => {
        return (
          <li key={post.slug} className="blogListItem">
            <BlogListItem post={post} preferredTag={preferredTag} />
          </li>
        );
      })}
      <style jsx>{`
        .blogList {
          list-style: none;
          margin: 0;
        }

        .blogListItem {
          margin-bottom: calc(var(--gap-size) * 3);
        }
      `}</style>
    </ul>
  );
};

export default BlogList;
