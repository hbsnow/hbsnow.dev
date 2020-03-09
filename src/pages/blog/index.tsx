import React from 'react'
import { NextPage } from 'next'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { BlogType, loadBlogList } from '../../modules/module'
import Link from 'next/link'
import Container from '../../elements/container/Container'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ blogList }) => {
  return (
    <DefaultTemplate>
      <Container>
        <ul>
          {blogList?.map((blog) => (
            <li key={blog.slug}>
              <Link href="/blog/[slug]" as={`/blog/${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </DefaultTemplate>
  )
}

export const getStaticProps = async (
  ctx
): Promise<{
  props: PageProps
}> => {
  const blogList = loadBlogList()
  console.log(ctx)

  return {
    props: {
      blogList,
    },
  }
}

type PageProps = {
  blogList: BlogType[]
}

export default Page
