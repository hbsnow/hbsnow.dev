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
import HomeHeader from '../components/home/HomeHeader'
import HomeAbout from '../components/home/HomeAbout'

export const config = { amp: true }

type Props = {
  blogList: BlogType[]
  bookList: Entry<IBookFields>[]
}

const Page: NextPage<Props> = ({ blogList, bookList }) => {
  const sortedBlogList = useSortBlog(blogList)
  const latestBlogList = useMemo(() => {
    return sortedBlogList.slice(0, 3)
  }, [sortedBlogList])

  const latestBookList = useMemo(() => {
    return bookList.slice(0, 3)
  }, [bookList])

  return (
    <>
      <Head>
        <title>hbsnow.dev</title>
        <meta name="description" content="hbsnow のメモ書き置き場兼実験場。" />
      </Head>
      <DefaultTemplate>
        <div className="main">
          <div className="section dark">
            <Container>
              <Margin y={4}>
                <HomeAbout />
              </Margin>
            </Container>
          </div>

          <section className="section">
            <Container>
              <Margin y={4}>
                <HomeHeader title="Latest Posts">
                  <Link href="/blog">
                    <a>All {blogList.length} Posts</a>
                  </Link>
                </HomeHeader>

                <BlogList blogList={latestBlogList} />
              </Margin>
            </Container>
          </section>

          <section className="section">
            <Container>
              <Margin y={4}>
                <HomeHeader title="Latest Read Books">
                  <Link href="/blog">
                    <a>All {bookList.length} Read Books</a>
                  </Link>
                </HomeHeader>

                <BookList bookList={latestBookList} />
              </Margin>
            </Container>
          </section>
        </div>
      </DefaultTemplate>
      <style jsx>{`
        .section:not(:first-child):not(:last-child) {
          border-bottom: 1px solid var(--color-default-divider);
        }

        .section.dark {
          background-color: var(--color-default-surface);
        }
      `}</style>
    </>
  )
}

export const getStaticProps = async (): Promise<{
  props: Props
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

export default Page
