import React from 'react'
import { useMedia } from 'react-use'
import styled from '@emotion/styled'
import { SerializedStyles, css } from '@emotion/core'
import { mediaQuery } from '../../styles/const'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import Book from './Book'

const Colmun = styled.div``

const BookColmuns = ({
  styles,
  books,
  ...restProps
}: BookColmunsProps): JSX.Element => {
  const bookColmunsCss = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

    @media ${mediaQuery.md} {
      grid-template-columns: 1fr 1fr;
    }
  `

  const mq = {
    match: [useMedia(mediaQuery.md)],
    colmuns: [2],
  }
  const colmunIndex = mq.match.findIndex((_) => _)
  const colmunLength = colmunIndex === -1 ? 1 : mq.colmuns[colmunIndex]

  console.log(mq, colmunLength)

  return (
    <div css={[bookColmunsCss, styles]} {...restProps}>
      {books.map((book) => (
        <Colmun key={book.sys.id}>
          <Book book={book} />
        </Colmun>
      ))}
    </div>
  )
}

type BookColmunsProps = {
  styles?: SerializedStyles
  books: Entry<IBookFields>[]
} & JSX.IntrinsicElements['div']

export default BookColmuns
