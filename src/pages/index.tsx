import React, { useMemo } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
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
import HomeAbout from '../components/home/HomeAbout'
import UnderlineLink from '../elements/link/UnderlineLink'

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
        <meta
          name="description"
          content="hbsnow の技術メモ置き場を兼ねた実験場。"
        />
      </Head>
      <DefaultTemplate>
        <div className="main">
          <div className="section about">
            <Container>
              <Margin y={6}>
                <HomeAbout>
                  <p>札幌ではたらく Front End Developer です。</p>
                </HomeAbout>
              </Margin>
            </Container>
          </div>

          <section className="section">
            <Container>
              <Margin y={6}>
                <h2 id="latest-posts">Latest Posts</h2>

                <BlogList blogList={latestBlogList} />

                <Margin y={2}>
                  <div className="allView">
                    <UnderlineLink href="/blog">
                      All {blogList.length} Posts
                    </UnderlineLink>
                  </div>
                </Margin>
              </Margin>
            </Container>
          </section>

          <section className="section">
            <Container>
              <Margin y={6}>
                <h2 id="latest-read-books">Latest Read Books</h2>

                <BookList bookList={latestBookList} />

                <Margin y={2}>
                  <div className="allView">
                    <UnderlineLink href="/book">
                      All {bookList.length} Read Books
                    </UnderlineLink>
                  </div>
                </Margin>
              </Margin>
            </Container>
          </section>
        </div>
      </DefaultTemplate>
      <style jsx>{`
        .section:not(:first-child):not(:last-child) {
          border-bottom: 1px solid var(--color-default-divider);
        }

        .section.about {
          position: relative;
          z-index: 2;
        }
        .section.about::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--color-default-surface);
          transform: skew(0, var(--layout-deg));
          z-index: -1;
        }
        .section.about::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--color-default-bg);
          opacity: 0.6;
          z-index: -1;
        }

        .allView {
          text-align: center;
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
