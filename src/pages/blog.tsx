import React from 'react'
import { NextPage } from 'next'
import PageTemplate from '../templates/PageTemplate/PageTemplate'
import Link from 'next/link'

const Page: NextPage = () => (
  <PageTemplate>
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
            <a>{post.document.data.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </PageTemplate>
)

export default Page
