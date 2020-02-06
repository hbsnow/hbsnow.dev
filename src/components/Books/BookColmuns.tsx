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

const createBookColmuns = (
  books: BookColmunsProps['books'],
  length: number
): JSX.Element[][] => {
  const colmuns: JSX.Element[][] = Array.from({ length }).map(() => [])
  books.forEach((book, i) => {
    colmuns[i % length].push(<div key={book.sys.id}>{book.fields.name}</div>)
  })
  return colmuns
}

const BookColmuns = ({
  css,
  books,
  ...restProps
}: BookColmunsProps): JSX.Element => {
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
  const colmunIndex = mq.match.findIndex((_) => _)
  const colmunLength = colmunIndex === -1 ? 1 : mq.colmuns[colmunIndex]
  const colmuns = createBookColmuns(books, colmunLength)
  console.log(mq, colmuns)

  return (
    <div css={[bookListCss, css]} {...restProps}>
      {books.map((book, i) => (
        <div key={book.sys.id}>{colmuns[i]}</div>
      ))}
    </div>
  )
}

type BookColmunsProps = {
  css?: SerializedStyles
  books: Entry<IBookFields>[]
} & JSX.IntrinsicElements['div']

export default BookColmuns
