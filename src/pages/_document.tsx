import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document'
import { Global } from '@emotion/core'
import 'normalize.css'
import { globalStyles } from '../styles/globalStyles'

class BaseDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:400,700&amp;display=swap"
          />
        </Head>
        <Global styles={globalStyles} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default BaseDocument
