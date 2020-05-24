import React, { FC } from 'react'

import { imageSize } from 'image-size'
import ReactMarkdown from 'react-markdown'
import remarkSectionize from 'remark-sectionize'

import Blockcode from '../blockcode/Blockcode'
import Blockquote from '../blockquote/Blockquote'
import Heading from '../heading/Heading'
import ExternalLink from '../link/ExternalLink'

type Props = {
  readonly source: string
} & Omit<JSX.IntrinsicElements['div'], 'className'>

const Markdown: FC<Props> = ({ source, ...restProps }) => {
  const code: FC<{ language: string; value: string }> = ({
    language,
    value,
  }) => {
    return <Blockcode language={language}>{value}</Blockcode>
  }

  const section: FC = ({ children }) => {
    return <section>{children}</section>
  }

  const heading: FC<{ level: string }> = ({ level, children }) => {
    return <Heading level={parseInt(level)}>{children}</Heading>
  }

  const image: FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const dimensions = imageSize(`public/${src}`)

    return (
      <div className="ampImage">
        <amp-img
          src={src}
          alt={alt}
          layout="responsive"
          width={dimensions.width}
          height={dimensions.height}
        />
        <style jsx>{`
          .ampImage {
            max-width: 100%;
          }
        `}</style>
      </div>
    )
  }

  const link: FC<{ href: string }> = ({ children, href }) => {
    if (href.startsWith('http')) {
      return <ExternalLink href={href}>{children}</ExternalLink>
    }
    // SSGなのでLinkでなくても問題なさそう
    return <a href={href}>{children}</a>
  }

  const blockquote: FC = ({ children }) => {
    return <Blockquote>{children}</Blockquote>
  }

  return (
    <div data-testid="Markdown" className="markdown" {...restProps}>
      <ReactMarkdown
        source={source}
        plugins={[remarkSectionize]}
        renderers={{
          code,
          section,
          heading,
          image,
          link,
          blockquote,
        }}
      />
    </div>
  )
}

export default Markdown
