import React, { useMemo } from 'react'

import { Entry } from 'contentful'
import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'

import BlogList from '../components/blog/BlogList'
import Meta from '../components/head/Meta'
import HomeAbout from '../components/home/HomeAbout'
import Accent from '../elements/accent/Accent'
import Container from '../elements/container/Container'
import Icon from '../elements/icon/Icon'
import ExternalLink from '../elements/link/ExternalLink'
import Margin from '../elements/margin/Margin'
import { useSortBlog, useMaxBlogUpdatedAt } from '../hooks/blog'
import { useMaxBookUpdatedAt } from '../hooks/book'
import { IBookFields } from '../models/contentful'
import { BlogType, loadBlogList } from '../modules/blog'
import { fetchBookList } from '../modules/book'
import DefaultTemplate from '../templates/DefaultTemplate'

export const config = { amp: true }

type Props = {
  readonly blogList: BlogType[]
  readonly bookList: Entry<IBookFields>[]
}

const Page: NextPage<Props> = ({ blogList, bookList }) => {
  const sortedBlogList = useSortBlog(blogList)
  const latestBlogList = useMemo(() => {
    return sortedBlogList.slice(0, 3)
  }, [sortedBlogList])

  const blogUpdatedAt = useMaxBlogUpdatedAt(blogList)
  const bookUpdatedAt = useMaxBookUpdatedAt(bookList)
  const updatedAt =
    blogUpdatedAt > bookUpdatedAt ? bookUpdatedAt : blogUpdatedAt

  return (
    <>
      <Meta
        type="article"
        title="hbsnow.dev"
        path="/"
        description="hbsnow の技術メモ置き場を兼ねた実験場。"
        createdAt="2017-12-01"
        updatedAt={updatedAt}
      />

      <DefaultTemplate>
        <div className="main">
          <div className="section about">
            <Container>
              <Margin y={6}>
                <HomeAbout>
                  <p>札幌ではたらく Front End Developer です。</p>
                  <p>
                    このサイトは{' '}
                    <ExternalLink href="https://nextjs.org/">
                      Next.js
                    </ExternalLink>{' '}
                    で SSG され、ソースコードは{' '}
                    <ExternalLink href="https://github.com/hbsnow/hbsnow.dev">
                      GitHub
                    </ExternalLink>{' '}
                    にて公開されています。
                  </p>
                </HomeAbout>
              </Margin>
            </Container>
          </div>

          <section className="section">
            <Container>
              <Margin y={6}>
                <h2 id="latest-posts">
                  <Accent>Latest Posts</Accent>
                </h2>

                <BlogList blogList={latestBlogList} />

                <Margin y={2}>
                  <div className="allView">
                    <Link href="/blog/">
                      <a className="link">
                        All {blogList.length} Posts <Icon name="arrowRight" />
                      </a>
                    </Link>
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
          text-align: right;
        }

        .link {
          color: var(--color-primary);
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props
}> => {
  const blogList = loadBlogList()
  const bookList = await fetchBookList()

  return {
    props: {
      blogList,
      bookList: bookList?.items ?? [],
    },
  }
}

export default Page
