import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import { fetchBookList } from '../../modules/book'
import Book from '../../components/book/Book'
import Container from '../../elements/container/Container'
import Margin from '../../elements/margin/Margin'

export const config = { amp: true }

type Props = {
  bookList: Entry<IBookFields>[]
}

const Page: NextPage<Props> = ({ bookList }) => {
  return (
    <>
      <Head>
        <title>hbsnow.dev</title>
        <meta
          name="description"
          content="hbsnow の読んだ本の感想と積んでる本の記録。"
        />
      </Head>
      <DefaultTemplate>
        <Container>
          {bookList.map((book) => (
            <Margin key={book.sys.id} bottom={2}>
              <Book book={book} />
            </Margin>
          ))}
        </Container>
      </DefaultTemplate>
    </>
  )
}

export const getStaticProps = async (): Promise<{
  props: Props
}> => {
  const bookList = await fetchBookList()

  return {
    props: {
      bookList: bookList.items,
    },
  }
}

export default Page
