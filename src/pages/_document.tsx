import React from 'react'

import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class BaseDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="theme-color" content="#fff" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link
            rel="icon"
            type="image/svg+xml"
            sizes="any"
            href="/assets/img/site-icons/icon.svg"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/assets/img/site-icons/icon-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="256x256"
            href="/assets/img/site-icons/icon-256x256.png"
          />
          <link
            rel="mask-icon"
            color="#335BC4"
            href="/assets/img/site-icons/mask.svg"
          />

          <link
            rel="stylesheet"
            // https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap
            // 上記の新APIだとAMP Validationでエラーになる
            href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:400,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default BaseDocument
