import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../organisms/header/Header'
import Footer from '../organisms/footer/Footer'
import styled from '@emotion/styled'
import Link from 'next/link'
import {
  StateContext,
  DispatchContext,
  StateType,
  loadBlogList,
  fetchBookList,
  BlogType,
} from '../modules/module'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'
import { EntryCollection } from 'contentful'
import { IBookFields } from '../models/contentful'

const Page: NextPage<PageProps> = ({ blogList, bookList }) => {
  const IndexTemplate = styled(DefaultTemplate)`
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
  `

  const state: StateType = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    dispatch({ type: 'blogList', blogList })
  }, [blogList])

  useEffect(() => {
    dispatch({ type: 'bookList', bookList })
  }, [bookList])

  return (
    <IndexTemplate>
      <Header />
      <main>
        <h2>Latest Posts</h2>

        <Link href="/blog">
          <a>all posts</a>
        </Link>

        {state.blogList?.map((post) => {
          return <div key={post.slug}>{post.slug}</div>
        })}

        <h2>BookList</h2>

        {state.bookList?.items.map((book) => {
          return <div key={book.fields.name}>{book.fields.name}</div>
        })}
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
