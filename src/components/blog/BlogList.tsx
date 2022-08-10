import React from "react";

import { TagType } from "../../elements/icon/Icon";
import { BlogType } from "../../modules/blog";
import BlogListItem from "./BlogListItem";

type Props = Readonly<{
  blogList: BlogType[];
  preferredTag?: TagType;
}>;

const BlogList = (props: Props): JSX.Element => {
  const { blogList, preferredTag } = props;

  return (
    <ul className="blogList">
      {blogList?.map((post) => {
        return (
          <li key={post.slug} className="blogListItem">
            <BlogListItem post={post} preferredTag={preferredTag} />
          </li>
        );
      })}
    </ul>
  );
};

export default BlogList;
