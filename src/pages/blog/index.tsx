import React from 'react'

import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

import BlogList from '../../components/blog/BlogList'
import Container from '../../elements/container/Container'
import Margin from '../../elements/margin/Margin'
import { useSortBlog } from '../../hooks/blog'
import { BlogType, loadBlogList } from '../../modules/blog'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'

export const config = { amp: true }

type Props = {
  blogList: BlogType[]
}

const Page: NextPage<Props> = ({ blogList }) => {
  const sortedBlogList = useSortBlog(blogList)

  return (
    <>
      <Head>
        <title>hbsnow.dev</title>
        <meta name="description" content="hbsnow のブログ記事一覧。" />
      </Head>
      <DefaultTemplate>
        <Container>
          <Margin bottom={6}>
            <BlogList blogList={sortedBlogList} />
          </Margin>
        </Container>
      </DefaultTemplate>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props
}> => {
  const blogList = loadBlogList()

  return {
    props: {
      blogList: JSON.parse(JSON.stringify(blogList)),
    },
  }
}

export default Page
