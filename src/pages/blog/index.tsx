import React from 'react'
import { NextPage } from 'next'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { BlogType, loadBlogList } from '../../modules/blog'
import Container from '../../elements/container/Container'
import BlogList from '../../components/blogList/BlogList'
import { useSortBlog } from '../../hooks/blog'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ blogList }) => {
  const sortedBlogList = useSortBlog(blogList)

  return (
    <DefaultTemplate>
      <Container>
        <BlogList blogList={sortedBlogList} />
      </Container>
    </DefaultTemplate>
  )
}

export const getStaticProps = async (): Promise<{
  props: PageProps
}> => {
  const blogList = loadBlogList()

  return {
    props: {
      blogList: JSON.parse(JSON.stringify(blogList)),
    },
  }
}

type PageProps = {
  blogList: BlogType[]
}

export default Page
