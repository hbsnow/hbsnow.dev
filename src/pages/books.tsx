import React from 'react'
import { NextPage } from 'next'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'
import { createClient, EntryCollection } from 'contentful'
import { IBookFields } from '../models/contentful'
import BookColmuns from '../components/Books/BookColmuns'

const Page: NextPage<PageProps> = ({ entries }) => {
  return (
    <DefaultTemplate title="Blog">
      <BookColmuns books={entries.items} />
    </DefaultTemplate>
  )
}

Page.getInitialProps = async (): Promise<PageProps> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN,
  })

  // eslint-disable-next-line @typescript-eslint/camelcase
  const query = { content_type: 'book' }

  return {
    entries: await client.getEntries(query),
  }
}

type PageProps = {
  entries: EntryCollection<IBookFields>
}

export default Page
