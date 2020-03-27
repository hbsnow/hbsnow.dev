import React from 'react'
import { BlogType } from '../../modules/blog'
import BlogListItem from './BlogListItem'
import { mediaQuery } from '../../styles/const'

const BlogList: React.FC<BlogListProps> = ({ blogList, ...restProps }) => {
  return (
    <ul className="blogList" {...restProps}>
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

type BlogListProps = {
  blogList: BlogType[]
} & JSX.IntrinsicElements['ul']

export default BlogList
