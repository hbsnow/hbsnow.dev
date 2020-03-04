import React from 'react'
import { NextPage } from 'next'
import PageTemplate from '../../templates/PageTemplate/PageTemplate'
import { EntryCollection } from 'contentful'
import { IBookFields } from '../../models/contentful'
import { fetchBookList } from '../../modules/module'
import BookList from '../../components/book/BookList'
import Container from '../../elements/container/Container'

const Page: NextPage<PageProps> = ({ bookList }) => {
  return (
    <PageTemplate>
      <Container>
        <BookList bookList={bookList.items} />
      </Container>
    </PageTemplate>
  )
}

Page.getInitialProps = async (): Promise<PageProps> => {
  const bookList = await fetchBookList()

  return { bookList }
}

type PageProps = {
  bookList: EntryCollection<IBookFields>
}

export default Page
