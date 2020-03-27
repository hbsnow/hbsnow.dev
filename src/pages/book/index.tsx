import React from 'react'
import { NextPage } from 'next'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import { fetchBookList } from '../../modules/book'
import Book from '../../components/book/Book'
import Container from '../../elements/container/Container'
import Margin from '../../elements/margin/Margin'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ bookList }) => {
  return (
    <DefaultTemplate>
      <Container>
        {bookList.map((book) => (
          <Margin key={book.sys.id} bottom={2}>
            <Book book={book} />
          </Margin>
        ))}
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
