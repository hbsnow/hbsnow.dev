import React from 'react'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'
import { createClient, EntryCollection } from 'contentful'
import { IBook } from '../models/contentful'

const Page = ({ entries }): JSX.Element => {
  console.log(entries)
  return (
    <DefaultTemplate title="Blog">
      {process.env.CONTENTFUL_SPACE_ID}
    </DefaultTemplate>
  )
}

Page.getInitialProps = async (): Promise<{
  entries: EntryCollection<IBook>
}> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN,
  })

  const entries = (await client.getEntries()) as EntryCollection<IBook>
  return { entries }
}

export default Page
