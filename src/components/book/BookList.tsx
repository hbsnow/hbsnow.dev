import React from 'react'
import { mediaQuery } from '../../styles/const'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import BookListItem from './BookListItem'

const BookList: React.FC<BookListProps> = ({ bookList, ...restProps }) => {
  return (
    <ul className="bookList" {...restProps}>
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

        @media ${mediaQuery.md} {
          .bookList {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ul>
  )
}

type BookListProps = {
  bookList: Entry<IBookFields>[]
} & JSX.IntrinsicElements['ul']

export default BookList
