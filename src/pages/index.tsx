import React from 'react'
import { css } from '@emotion/core'
import Header from '../components/Header/Header'

const root = css({
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const Index = (): JSX.Element => {
  return (
    <div css={root}>
      <Header />
    </div>
  )
}

export default Index
