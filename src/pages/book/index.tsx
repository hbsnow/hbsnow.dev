import React from 'react'
import { NextPage } from 'next'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { EntryCollection } from 'contentful'
import { IBookFields } from '../../models/contentful'
import { fetchBookList } from '../../modules/module'
import BookList from '../../components/book/BookList'
import Container from '../../elements/container/Container'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ bookList }) => {
  return (
    <DefaultTemplate>
      <Container>
        <BookList bookList={bookList.items} />
      </Container>
    </DefaultTemplate>
  )
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (): Promise<{
  props: PageProps
}> => {
  const bookList = await fetchBookList()

  return {
    props: {
      bookList,
    },
  }
}

type PageProps = {
  bookList: EntryCollection<IBookFields>
}

export default Page
