import "normalize.css";

import React from "react";

import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";

import globalStyles from "../styles/globalStyles";

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
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};

export default App;
