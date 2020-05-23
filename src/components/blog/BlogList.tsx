import React from 'react'

import { BlogType } from '../../modules/blog'
import BlogListItem from './BlogListItem'

type Props = {
  readonly blogList: BlogType[]
  readonly preferredTag?: string
}

const BlogList: React.FC<Props> = ({ blogList, preferredTag }) => {
  return (
    <ul className="blogList">
      {blogList?.map((post) => {
        return (
          <li key={post.slug} className="blogListItem">
            <BlogListItem post={post} preferredTag={preferredTag} />
          </li>
        )
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
  )
}

export default BlogList
