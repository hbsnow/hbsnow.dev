import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV !== 'production') {
  whyDidYouRender(React)
}

export const config = { amp: true }

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
