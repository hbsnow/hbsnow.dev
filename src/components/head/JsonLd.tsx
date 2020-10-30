import React, { FC } from "react";

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

type Props = Readonly<JsonLdType>;

const JsonLd: FC<Props> = ({ type, ...restProps }) => {
  switch (type) {
    case "article": {
      return <ArticleJsonLd {...restProps} />;
    }
    case "blog": {
      return <BlogJsonLd {...restProps} />;
    }
  }
};

export default JsonLd;
