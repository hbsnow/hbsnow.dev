import React from 'react'
import { SerializedStyles, css } from '@emotion/core'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'

export const bookCss = css``

const Book = ({ css, book, ...restProps }: BookProps): JSX.Element => {
  return (
    <div css={[bookCss, css]} {...restProps}>
      {book.fields.name}
    </div>
  )
}

type BookProps = {
  css?: SerializedStyles
  book: Entry<IBookFields>
} & JSX.IntrinsicElements['div']

export default Book
