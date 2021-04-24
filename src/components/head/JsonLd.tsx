import React from "react";

import { ArticleJsonLd, BlogJsonLd } from "next-seo";

export type JsonLdPageType = "article" | "blog";

export type JsonLdType = {
  type: JsonLdPageType;
  url: string;
  title: string;
  images: string[];
  datePublished: string;
  dateModified: string;
  authorName: string;
  publisherName: string;
  publisherLogo: string;
  description: string;
};

type Props = Readonly<Readonly<JsonLdType>>;

const JsonLd = (props: Props): JSX.Element => {
  const { type, ...rest } = props;

  switch (type) {
    case "article": {
      return <ArticleJsonLd {...rest} />;
    }
    case "blog": {
      return <BlogJsonLd {...rest} />;
    }
  }
};

export default JsonLd;
