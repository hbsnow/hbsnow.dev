import React from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'

import BlogList from '../../../../components/blog/BlogList'
import Meta from '../../../../components/head/Meta'
import Accent from '../../../../elements/accent/Accent'
import Container from '../../../../elements/container/Container'
import Icon from '../../../../elements/icon/Icon'
import Margin from '../../../../elements/margin/Margin'
import { useFilterBlogBy } from '../../../../hooks/blog'
import { BlogType, loadBlogList } from '../../../../modules/blog'
import DefaultTemplate from '../../../../templates/DefaultTemplate/DefaultTemplate'
import { toSlugString } from '../../../../utils/url'

export const config = { amp: true }

type Props = {
  slug: string
  blogList: BlogType[]
}

const Page: NextPage<Props> = ({ slug, blogList }) => {
  const filteredBlogList = useFilterBlogBy(blogList, slug)
  return (
    <>
      <Meta
        type="article"
        title={`${slug} | hbsnow.dev`}
        path={`/blog/tag/${slug}/`}
        description={`${slug} のタグが含まれるブログ記事。`}
        createdAt="2020-04-17"
        updatedAt={filteredBlogList?.[0].updatedAt}
      />
      <DefaultTemplate>
        <Container>
          <h2>
            <Accent>{slug}</Accent>
          </h2>

          <BlogList blogList={filteredBlogList} preferredTag={slug} />

          <Margin y={4}>
            <Link href="/blog/">
              <a className="link">
                <Icon name="arrowLeft" /> All Posts
              </a>
            </Link>
          </Margin>
        </Container>
      </DefaultTemplate>
      <style jsx>{`
        .link {
          color: var(--color-primary);
        }
      `}</style>
      `
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (): Promise<{
  fallback: boolean
  paths: string[]
}> => {
  const blogList = loadBlogList()
  const paths = blogList
    .flatMap((blog) => blog.tags)
    .filter((blog, i, self) => self.indexOf(blog) === i)
    .map((tag) => `/blog/tag/${tag}/`)

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{ props: Props }> => {
  const slug = toSlugString(params?.slug ?? [])
  const blogList = loadBlogList()

  return {
    props: {
      slug,
      blogList: JSON.parse(JSON.stringify(blogList)),
    },
  }
}

export default Page
