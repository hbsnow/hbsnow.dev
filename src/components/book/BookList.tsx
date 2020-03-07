import React from 'react'
import { mediaQuery } from '../../styles/const'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import BookListItem from './BookListItem'

const BookList = ({ bookList, ...restProps }: BookListProps): JSX.Element => {
  return (
    <div className="bookList" {...restProps}>
      {bookList.map((book) => (
        <div key={book.sys.id}>
          <BookListItem book={book} />
        </div>
      ))}
      <style jsx>{`
        .bookList {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        @media ${mediaQuery.md} {
          .bookList {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  )
}

type BookListProps = {
  bookList: Entry<IBookFields>[]
} & JSX.IntrinsicElements['div']

export default BookList
