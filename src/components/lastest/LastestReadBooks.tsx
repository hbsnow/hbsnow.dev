import React from 'react'
import { EntryCollection } from 'contentful'
import { IBookFields } from '../../models/contentful'

const LastestReadBooks = ({
  bookList,
  ...restProps
}: LastestReadBooksProps): JSX.Element => {
  return (
    <div {...restProps}>
      {bookList?.items.map((book) => {
        return <div key={book.fields.name}>{book.fields.name}</div>
      })}
    </div>
  )
}

type LastestReadBooksProps = {
  bookList: EntryCollection<IBookFields>
} & JSX.IntrinsicElements['div']

export default LastestReadBooks
