import React from 'react'
import { BlogType } from '../../modules/blog'
import BlogListItem from './BlogListItem'
import { mediaQuery } from '../../styles/const'

type Props = {
  blogList: BlogType[]
}

const BlogList: React.FC<Props> = ({ blogList }) => {
  return (
    <ul className="blogList">
      {blogList?.map((post) => {
        return (
          <li key={post.slug} className="blogListItem">
            <BlogListItem post={post} />
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

        @media ${mediaQuery.sm} {
          .blogListItem {
            margin-bottom: calc(var(--gap-size) * 2);
          }
        }
      `}</style>
    </ul>
  )
}

export default BlogList
