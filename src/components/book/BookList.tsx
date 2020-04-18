import React from 'react'

import { Entry } from 'contentful'

import { IBookFields } from '../../models/contentful'
import BookListItem from './BookListItem'

type Props = {
  bookList: Entry<IBookFields>[]
}

const BookList: React.FC<Props> = ({ bookList }) => {
  return (
    <ul className="bookList">
      {bookList.map((book) => (
        <li key={book.sys.id}>
          <BookListItem book={book} />
        </li>
      ))}
      <style jsx>{`
        .bookList {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem / 4;
        }
      `}</style>
    </ul>
  )
}

export default BookList
