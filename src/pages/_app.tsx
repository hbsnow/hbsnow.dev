import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

export const config = { amp: true }

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
