import React from 'react'
import { css } from '@emotion/core'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'

export const bookCss = css``

const Book = ({ book, ...restProps }: BookProps): JSX.Element => {
  return (
    <div css={bookCss} {...restProps}>
      {book.fields.name}
    </div>
  )
}

type BookProps = {
  book: Entry<IBookFields>
} & JSX.IntrinsicElements['div']

export default Book
