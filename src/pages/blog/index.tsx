import React from 'react'

import { NextPage, GetStaticProps } from 'next'

import BlogList from '../../components/blog/BlogList'
import Meta from '../../components/head/Meta'
import Container from '../../elements/container/Container'
import Margin from '../../elements/margin/Margin'
import {
  useSortBlog,
  useMinBlogCreatedAt,
  useMaxBlogUpdatedAt,
} from '../../hooks/blog'
import { BlogType, loadBlogList } from '../../modules/blog'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'

export const config = { amp: true }

type Props = {
  blogList: BlogType[]
}

const Page: NextPage<Props> = ({ blogList }) => {
  const sortedBlogList = useSortBlog(blogList)
  const createdAt = useMinBlogCreatedAt(blogList)
  const updatedAt = useMaxBlogUpdatedAt(blogList)

  return (
    <>
      <Meta
        type="article"
        title="Blog | hbsnow.dev"
        path="/blog/"
        description="hbsnow のブログ記事一覧。"
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
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
