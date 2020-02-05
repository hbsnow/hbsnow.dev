import React from 'react'
import { useMedia } from 'react-use'
import styled from '@emotion/styled'
import { SerializedStyles, css } from '@emotion/core'
import { mediaQuery } from '../../styles/const'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'

export const bookListCss = css`
  display: grid;
  grid-auto-flow: column;
`
// grid-gap: ${(props) => props.gap || `1em`};
export const Col = styled.div`
  display: grid;
`

const BookList = ({ css, books, ...restProps }: BookListProps): JSX.Element => {
  const mq = {
    match: [
      useMedia(mediaQuery.lg),
      useMedia(mediaQuery.md),
      useMedia(mediaQuery.xs),
    ],
    colmuns: [4, 3, 2],
  }
  //const [booksRef, { width }] = useMeasure()
  //const heights = new Array(mq.colmuns.length).fill(0)
  const index = mq.match.findIndex((_) => _)
  const colmuns = index === -1 ? 1 : mq.colmuns[index]
  console.log(mq, mq.colmuns.length, colmuns)

  return (
    <div css={[bookListCss, css]} {...restProps}>
      {books.map((book) => (
        <div key={book.sys.id}>{book.fields.name}</div>
      ))}
    </div>
  )
}

type BookListProps = {
  css?: SerializedStyles
  books: Entry<IBookFields>[]
} & JSX.IntrinsicElements['div']

export default BookList
