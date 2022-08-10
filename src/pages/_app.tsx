import React from "react";

import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo
        twitter={{
          cardType: "summary",
          site: "@hbsnow",
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
