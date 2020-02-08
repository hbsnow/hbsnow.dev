import React from 'react'
import { SerializedStyles, css } from '@emotion/core'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'

export const bookCss = css``

const Book = ({ styles, book, ...restProps }: BookProps): JSX.Element => {
  return (
    <div css={[bookCss, styles]} {...restProps}>
      {book.fields.name}
    </div>
  )
}

type BookProps = {
  styles?: SerializedStyles
  book: Entry<IBookFields>
} & JSX.IntrinsicElements['div']

export default Book
