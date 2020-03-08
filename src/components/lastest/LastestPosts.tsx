import React from 'react'
import Link from 'next/link'
import { BlogType } from '../../modules/module'

const LastestPosts = ({
  blogList,
  ...restProps
}: LastestPostsProps): JSX.Element => {
  return (
    <div {...restProps}>
      {blogList?.map((post) => {
        return (
          <div key={post.slug}>
            <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

type LastestPostsProps = {
  blogList: BlogType[]
} & JSX.IntrinsicElements['div']

export default LastestPosts
