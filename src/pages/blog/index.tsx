import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import PageTemplate from '../../templates/PageTemplate/PageTemplate'
import {
  StateType,
  StateContext,
  DispatchContext,
  BlogType,
  loadBlogList,
} from '../../modules/module'
import Link from 'next/link'
import Container from '../../elements/container/Container'

const Page: NextPage<PageProps> = ({ blogList }) => {
  const state: StateType = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    dispatch({ type: 'blogList', blogList })
  }, [blogList, dispatch])

  return (
    <PageTemplate>
      <Container>
        <ul>
          {state.blogList?.map((blog) => (
            <li key={blog.slug}>
              <Link href="/blog/[slug]" as={`/blog/${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </PageTemplate>
  )
}

Page.getInitialProps = async (): Promise<PageProps> => {
  const blogList = loadBlogList()

  return { blogList }
}

type PageProps = {
  blogList: BlogType[]
}

export default Page
