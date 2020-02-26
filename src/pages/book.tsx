import React from 'react'
import { NextPage } from 'next'
import PageTemplate from '../templates/PageTemplate/PageTemplate'
import BookColmuns from '../components/Books/BookColmuns'

const Page: NextPage = () => {
  return (
    <PageTemplate>
      <BookColmuns />
    </PageTemplate>
  )
}

export default Page
