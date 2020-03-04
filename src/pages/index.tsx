import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import styled from '@emotion/styled'
import Link from 'next/link'
import {
  DispatchContext,
  loadBlogList,
  fetchBookList,
  BlogType,
} from '../modules/module'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'
import { EntryCollection } from 'contentful'
import { IBookFields } from '../models/contentful'
import LastestPosts from '../components/lastest/LastestPosts'
import LastestReadBooks from '../components/lastest/LastestReadBooks'
import Container from '../elements/container/Container'

const Page: NextPage<PageProps> = ({ blogList, bookList }) => {
  const IndexTemplate = styled(DefaultTemplate)`
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
  `

  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    dispatch({ type: 'blogList', blogList })
  }, [blogList, dispatch])

  useEffect(() => {
    dispatch({ type: 'bookList', bookList })
  }, [bookList, dispatch])

  return (
    <IndexTemplate>
      <Header />
      <main>
        <Container>
          <section>
            <h2>Latest Posts</h2>

            <LastestPosts />

            <Link href="/blog">
              <a>All Posts</a>
            </Link>
          </section>

          <section>
            <h2>Latest Read Books</h2>

            <LastestReadBooks />

            <Link href="/book">
              <a>All Read Books</a>
            </Link>
          </section>
        </Container>
      </main>
      <Footer />
    </IndexTemplate>
  )
}

Page.getInitialProps = async (): Promise<PageProps> => {
  const blogList = loadBlogList()
  const bookList = await fetchBookList()

  return { blogList, bookList }
}

type PageProps = {
  blogList: BlogType[]
  bookList: EntryCollection<IBookFields>
}

export default Page
