import React from 'react'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'

const LastestReadBooks = ({
  bookList,
  ...restProps
}: LastestReadBooksProps): JSX.Element => {
  return (
    <div {...restProps}>
      {bookList.map((book) => {
        return <div key={book.fields.name}>{book.fields.name}</div>
      })}
    </div>
  )
}

type LastestReadBooksProps = {
  bookList: Entry<IBookFields>[]
} & JSX.IntrinsicElements['div']

export default LastestReadBooks
