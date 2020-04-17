import React from 'react'
import { ArticleJsonLd, BlogJsonLd } from 'next-seo'

export type JsonLdType = 'article' | 'blog'

type Props = {
  type: JsonLdType
  url: string
  title: string
  images: string[]
  datePublished: string
  dateModified: string
  authorName: string
  publisherName: string
  publisherLogo: string
  description: string
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
