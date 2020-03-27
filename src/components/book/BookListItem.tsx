import React from 'react'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'

const BookListItem: React.FC<BookListItemProps> = ({ book, ...restProps }) => {
  return <div {...restProps}>{book.fields.name}</div>
}

type BookListItemProps = {
  book: Entry<IBookFields>
} & JSX.IntrinsicElements['div']

export default BookListItem
