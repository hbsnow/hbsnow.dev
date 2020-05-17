import React from 'react'

import { ArticleJsonLd, BlogJsonLd } from 'next-seo'

export type JsonLdType = 'article' | 'blog'

type Props = {
  readonly type: JsonLdType
  readonly url: string
  readonly title: string
  readonly images: string[]
  readonly datePublished: string
  readonly dateModified: string
  readonly authorName: string
  readonly publisherName: string
  readonly publisherLogo: string
  readonly description: string
}

const JsonLd: React.FC<Props> = ({ type, ...restProps }) => {
  switch (type) {
    case 'article': {
      return <ArticleJsonLd {...restProps} />
    }
    case 'blog': {
      return <BlogJsonLd {...restProps} />
    }
  }
}

export default JsonLd
