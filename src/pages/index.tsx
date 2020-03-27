import React, { useMemo } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Entry } from 'contentful'
import { IBookFields } from '../models/contentful'
import { loadBlogList, BlogType } from '../modules/blog'
import { fetchBookList } from '../modules/book'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'
import Container from '../elements/container/Container'
import BlogList from '../components/blog/BlogList'
import BookList from '../components/book/BookList'
import Margin from '../elements/margin/Margin'
import { useSortBlog } from '../hooks/blog'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ blogList, bookList }) => {
  const sortedBlogList = useSortBlog(blogList)
  const latestBlogList = useMemo(() => {
    return sortedBlogList.slice(0, 4)
  }, [sortedBlogList])

  const latestBookList = useMemo(() => {
    return bookList.slice(0, 4)
  }, [bookList])

  return (
    <>
      <Head>
        <title>hbsnow.dev</title>
        <meta name="description" content="hbsnowのメモ書き置き場兼実験場。" />
      </Head>
      <DefaultTemplate>
        <Container>
          <Margin bottom={4}>
            <p>hbsnowのメモ書き置き場兼実験場。</p>
          </Margin>

          <Margin bottom={4}>
            <section>
              <h2>Latest Posts</h2>

              <BlogList blogList={latestBlogList} />

              <Link href="/blog">
                <a>All Posts</a>
              </Link>
            </section>
          </Margin>

          <Margin bottom={4}>
            <section>
              <h2>Latest Read Books</h2>

              <BookList bookList={latestBookList} />

              <Link href="/book">
                <a>All Read Books</a>
              </Link>
            </section>
          </Margin>
        </Container>
      </DefaultTemplate>
    </>
  )
}

export const getStaticProps = async (): Promise<{
  props: PageProps
}> => {
  const blogList = loadBlogList()
  const bookList = await fetchBookList()

  return {
    props: {
      blogList,
      bookList: bookList.items,
    },
  }
}

type PageProps = {
  blogList: BlogType[]
  bookList: Entry<IBookFields>[]
}

export default Page
