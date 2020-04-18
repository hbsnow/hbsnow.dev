import { createClient } from 'contentful'

import { StateType } from '.'

export const fetchBookList = async (): Promise<StateType['bookList']> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN ?? '',
  })

  // eslint-disable-next-line @typescript-eslint/camelcase
  const query = { content_type: 'book' }

  return client.getEntries(query)
}
