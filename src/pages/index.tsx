import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../organisms/header/Header'
import Footer from '../organisms/footer/Footer'
import styled from '@emotion/styled'
import Link from 'next/link'
import { StateContext, DispatchContext } from '../modules/module'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'

const Page: NextPage = () => {
  const IndexTemplate = styled(DefaultTemplate)`
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
  `

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    if (!state.blog) {
      dispatch({ type: 'loadBlog' })
    }
  }, [state.blog])

  useEffect(() => {
    if (!state.blog) {
      dispatch({ type: 'loadBlog' })
    }
  }, [state.blog])

  return (
    <IndexTemplate>
      <Header />
      <main>
        <h2>Latest Posts</h2>

        <Link href="/blog">
          <a>all posts</a>
        </Link>
      </main>
      <Footer />
    </IndexTemplate>
  )
}

export default Page
