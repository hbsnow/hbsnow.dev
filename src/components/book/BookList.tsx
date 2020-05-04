import React from 'react'

import { Entry } from 'contentful'

import Accent from '../../elements/accent/Accent'
import Margin from '../../elements/margin/Margin'
import { useSort, useGroupByCategory } from '../../hooks/book'
import { IBookFields } from '../../models/contentful'
import Book from './Book'
import BookListItem from './BookListItem'

type Props = {
  bookList: Entry<IBookFields>[]
}

const BookList: React.FC<Props> = ({ bookList }) => {
  const sortedBookList = useSort(bookList)
  const groupByCategoryBookList = useGroupByCategory(sortedBookList)

  return (
    <>
      {groupByCategoryBookList.map((groupByCategoryBook) => {
        return (
          <section key={groupByCategoryBook.slug}>
            <h2 id={groupByCategoryBook.slug}>
              <Accent>
                <a href={`#${groupByCategoryBook.slug}`}>
                  {groupByCategoryBook.title}
                </a>
              </Accent>
            </h2>

            {groupByCategoryBook.contents.map((book) => (
              <Margin key={book.isbn} bottom={4}>
                <Book book={book} />
              </Margin>
            ))}
          </section>
        )
      })}
    </>
  )

  return (
    <section className="bookList">
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
    </section>
  )
}

export default BookList
