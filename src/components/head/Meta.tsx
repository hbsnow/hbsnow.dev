import React from 'react'

import { NextSeo } from 'next-seo'

import { useFormattedDate } from '../../hooks/date'
import { useFullPath, useOgpImagePath } from '../../hooks/url'
import JsonLd, { JsonLdType } from './JsonLd'

type Props = {
  readonly type: JsonLdType
  readonly title: string
  readonly path: string
  readonly description: string
  readonly createdAt: string
  readonly updatedAt?: string
}

const Meta: React.FC<Props> = ({
  type,
  title,
  path,
  description,
  createdAt,
  updatedAt,
}) => {
  const dateFormat = 'YYYY-MM-DDTHH:mm:ss+09:00'
  const datePublished = useFormattedDate(createdAt, dateFormat)
  const dateModified = useFormattedDate(updatedAt, dateFormat)

  const page = Object.freeze({
    url: useFullPath(path),
    cover: useFullPath('assets/img/og/cover.png'),
    images: [useFullPath('assets/img/og/site-icons/icon-1200x1200.png')],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      name: 'hbsnow',
      logo: useFullPath('assets/img/og/logo.png'),
    },
  })

  const jsonLd = Object.freeze({
    type,
    url: page.url,
    title,
    images: page.images,
    datePublished: page.datePublished,
    dateModified: page.dateModified,
    authorName: page.author.name,
    publisherName: page.author.name,
    publisherLogo: page.author.logo,
    description,
  })

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          url: page.url,
          images: [
            {
              url: useOgpImagePath(title),
            },
          ],
        }}
      />
      <JsonLd {...jsonLd} />
    </>
  )
}

export default Meta
