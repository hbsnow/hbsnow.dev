import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import 'normalize.css'
import globalStyles from '../styles/globalStyles'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React)
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default App
