import React from 'react'
import { BlogType } from '../../modules/module'
import BlogListItem from './BlogListItem'

const BlogList: React.FC<BlogListProps> = ({ blogList, ...restProps }) => {
  return (
    <>
      <ul className="blogList" {...restProps}>
        {blogList?.map((post) => {
          return (
            <li key={post.slug}>
              <BlogListItem post={post} />
            </li>
          )
        })}
      </ul>
      <style jsx>{`
        .blogList {
          list-style: none;
        }
      `}</style>
    </>
  )
}

type BlogListProps = {
  blogList: BlogType[]
} & JSX.IntrinsicElements['ul']

export default BlogList
