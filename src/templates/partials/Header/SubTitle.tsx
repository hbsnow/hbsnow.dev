import React from 'react'
import { SerializedStyles, css } from '@emotion/core'

const SubTitle = ({ styles, title }: SubTitleProps): JSX.Element => {
  const subTitleCss = css`
    min-height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    row-gap: 1rem;
  `

  return <div css={[subTitleCss, styles]}>{title.name}</div>
}

export type Title = {
  name: string
  href: string
}

type SubTitleProps = {
  styles?: SerializedStyles
  title: Title
}

export default SubTitle
