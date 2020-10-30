import React from "react";

import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class BaseDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
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
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&amp;display=swap&amp;text=hbsnow.dev"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default BaseDocument;
