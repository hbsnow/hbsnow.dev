import React from 'react'
import styled from '@emotion/styled'
import { mediaQuery } from '../../styles/const'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import BookListItem from './BookListItem'

const BookList = ({ bookList, ...restProps }: BookListProps): JSX.Element => {
  const BookList = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

    @media ${mediaQuery.md} {
      grid-template-columns: 1fr 1fr;
    }
  `

  const Colmun = styled('div')``

  return (
    <BookList {...restProps}>
      {bookList.map((book) => (
        <Colmun key={book.sys.id}>
          <BookListItem book={book} />
        </Colmun>
      ))}
    </BookList>
  )
}

type BookListProps = {
  bookList: Entry<IBookFields>[]
} & JSX.IntrinsicElements['div']

export default BookList
