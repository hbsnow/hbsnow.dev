import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { EntryCollection } from 'contentful'
import { IBookFields } from '../models/contentful'
import { loadBlogList, fetchBookList, BlogType } from '../modules/module'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'
import Container from '../elements/container/Container'
import LastestPosts from '../components/lastest/LastestPosts'
import LastestReadBooks from '../components/lastest/LastestReadBooks'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ blogList, bookList }) => {
  return (
    <DefaultTemplate>
      <Container>
        <section>
          <h2>Latest Posts</h2>

          <LastestPosts blogList={blogList} />

          <Link href="/blog">
            <a>All Posts</a>
          </Link>
        </section>

        <section>
          <h2>Latest Read Books</h2>

          <LastestReadBooks bookList={bookList} />

          <Link href="/book">
            <a>All Read Books</a>
          </Link>
        </section>
      </Container>
    </DefaultTemplate>
  )
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (): Promise<{
  props: PageProps
}> => {
  const blogList = loadBlogList()
  const bookList = await fetchBookList()

  return {
    props: {
      blogList,
      bookList,
    },
  }
}

type PageProps = {
  blogList: BlogType[]
  bookList: EntryCollection<IBookFields>
}

export default Page
