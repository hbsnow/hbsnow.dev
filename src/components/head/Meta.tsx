import React, { FC } from "react";

import { NextSeo } from "next-seo";

import { useFormattedDate } from "../../hooks/date";
import { useFullPath, useOgpImagePath } from "../../hooks/url";
import JsonLd, { JsonLdPageType, JsonLdType } from "./JsonLd";

type Props = {
  type: JsonLdPageType;
  title: string;
  path: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
};

const Meta: FC<Props> = ({
  type,
  title,
  path,
  description,
  createdAt,
  updatedAt,
}) => {
  const pageUrl = useFullPath(path);
  const dateFormat = "YYYY-MM-DDTHH:mm:ss+09:00";
  const datePublished = useFormattedDate(createdAt, dateFormat);
  const dateModified = useFormattedDate(updatedAt, dateFormat);

  const jsonLd: Readonly<JsonLdType> = {
    type,
    url: pageUrl,
    title,
    images: [useFullPath("assets/img/og/site-icons/icon-1200x1200.png")],
    datePublished,
    dateModified: dateModified ?? datePublished,
    authorName: "hbsnow",
    publisherName: "hbsnow",
    publisherLogo: useFullPath("assets/img/og/logo.png"),
    description,
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          url: pageUrl,
          images: [
            {
              url: useOgpImagePath(title),
            },
          ],
        }}
      />
      <JsonLd {...jsonLd} />
    </>
  );
};

export default Meta;
