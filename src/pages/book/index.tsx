import React from 'react'
import { NextPage } from 'next'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import { fetchBookList } from '../../modules/book'
import BookList from '../../components/book/BookList'
import Container from '../../elements/container/Container'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ bookList }) => {
  return (
    <DefaultTemplate>
      <Container>
        <BookList bookList={bookList} />
      </Container>
    </DefaultTemplate>
  )
}

export const getStaticProps = async (): Promise<{
  props: PageProps
}> => {
  const bookList = await fetchBookList()

  return {
    props: {
      bookList: bookList.items,
    },
  }
}

type PageProps = {
  bookList: Entry<IBookFields>[]
}

export default Page
