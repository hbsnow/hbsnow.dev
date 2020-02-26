import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../organisms/header/Header'
import Footer from '../organisms/footer/Footer'
import styled from '@emotion/styled'
import Link from 'next/link'
import {
  StateContext,
  DispatchContext,
  loadBlog,
  StateType,
  fetchBook,
} from '../modules/module'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'

const Page: NextPage = () => {
  const IndexTemplate = styled(DefaultTemplate)`
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
  `

  const state: StateType = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    if (!state.blog) {
      dispatch({ type: 'blog', blog: loadBlog() })
    }
  }, [state.blog])

  useEffect(() => {
    if (!state.book) {
      ;(async (): Promise<void> => {
        dispatch({ type: 'book', book: await fetchBook() })
      })()
    }
  }, [state.book])

  return (
    <IndexTemplate>
      <Header />
      <main>
        <h2>Latest Posts</h2>

        <Link href="/blog">
          <a>all posts</a>
        </Link>

        {state.blog?.map((post) => {
          return <div key={post.slug}>{post.slug}</div>
        })}

        <h2>Books</h2>

        {state.book?.items.map((book) => {
          return <div key={book.fields.name}>{book.fields.name}</div>
        })}
      </main>
      <Footer />
    </IndexTemplate>
  )
}

export default Page
