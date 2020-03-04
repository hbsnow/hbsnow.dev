import React from 'react'
import { css } from '@emotion/core'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'

export const bookCss = css``

const BookListItem = ({
  book,
  ...restProps
}: BookListItemProps): JSX.Element => {
  return (
    <div css={bookCss} {...restProps}>
      {book.fields.name}
    </div>
  )
}

type BookListItemProps = {
  book: Entry<IBookFields>
} & JSX.IntrinsicElements['div']

export default BookListItem
