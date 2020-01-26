import React from 'react'
import { css, SerializedStyles } from '@emotion/core'
import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import Main from '../shared/Main/Main'

const containerStyle = css`
  min-height: 100%;
`

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, style }) => {
  return (
    <div css={[containerStyle, style]}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}

type DefaultLayoutProps = {
  style?: SerializedStyles
}

export default DefaultLayout
