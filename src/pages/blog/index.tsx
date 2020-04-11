import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { BlogType, loadBlogList } from '../../modules/blog'
import Container from '../../elements/container/Container'
import BlogList from '../../components/blog/BlogList'
import { useSortBlog } from '../../hooks/blog'
import Margin from '../../elements/margin/Margin'

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

export const getStaticProps = async (): Promise<{
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
