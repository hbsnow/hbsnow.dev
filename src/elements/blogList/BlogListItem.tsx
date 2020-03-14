import React from 'react'
import { BlogType } from '../../modules/module'
import Link from 'next/link'
import { useFormatDate } from '../../hooks/date'

const BlogListItem: React.FC<BlogListItemProps> = ({ post, ...restProps }) => {
  const createdAt = useFormatDate(post.createdAt)
  const updatedAt = useFormatDate(post.updatedAt)

  return (
    <div className="blogListItem" {...restProps}>
      {createdAt}
      {updatedAt && updatedAt}
      <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
        <a>{post.title}</a>
      </Link>
      <style jsx>{`
        .blogListItem {
          list-style: none;
        }
      `}</style>
    </div>
  )
}

type BlogListItemProps = {
  post: BlogType
} & JSX.IntrinsicElements['div']

export default BlogListItem
