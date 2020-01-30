import React from 'react'
import { css, SerializedStyles } from '@emotion/core'
import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import Main from '../shared/Main/Main'

const containerCss = css`
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  row-gap: 1rem;
`
const headerCss = css`
  grid-row: 1 / 2;
`
const mainCss = css`
  grid-row: 2 / 3;
`
const footerCss = css`
  grid-row: 3 / 4;
`

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, css }) => {
  return (
    <div css={[containerCss, css]}>
      <Header css={headerCss} />
      <Main css={mainCss}>{children}</Main>
      <Footer css={footerCss} />
    </div>
  )
}

type DefaultLayoutProps = {
  css?: SerializedStyles
  title?: string
}

export default DefaultLayout
