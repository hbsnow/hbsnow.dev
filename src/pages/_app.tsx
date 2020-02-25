import React, { useReducer } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import {
  StateContext,
  DispatchContext,
  reducer,
  initialState,
} from '../modules/module'

if (process.env.NODE_ENV !== 'production') {
  whyDidYouRender(React)
}

export const config = { amp: true }

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const book = useReducer(bookReducer, initialBookState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Component {...pageProps} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
