import React, { Children } from 'react'

import { imageSize } from 'image-size'
import { onlyText } from 'react-children-utilities'
import ReactMarkdown from 'react-markdown'
import remarkSectionize from 'remark-sectionize'
import remarkToc from 'remark-toc'

import Blockcode from '../blockcode/Blockcode'
import Heading from '../heading/Heading'

type Props = {
  source: string
} & JSX.IntrinsicElements['div']

const isToc = (children?: React.ReactNode): boolean => {
  if (!children) return false
  return onlyText(children) === '目次'
}

const Markdown: React.FC<Props> = ({ source, ...restProps }) => {
  const code: React.FC<{ language: string; value: string }> = ({
    language,
    value,
  }) => {
    return <Blockcode language={language}>{value}</Blockcode>
  }

  const section: React.FC = ({ children }) => {
    if (isToc(Children.toArray(children)?.[0])) {
      return <section className="toc">{children}</section>
    }
    return <section>{children}</section>
  }

  const heading: React.FC<{ level: string }> = ({ level, children }) => {
    const headingLevel = parseInt(level)
    if (headingLevel === 2 && isToc(children)) {
      return null
    }

    return <Heading level={headingLevel}>{children}</Heading>
  }

  const image: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
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

  return (
    <div data-testid="Markdown" className="markdown" {...restProps}>
      <ReactMarkdown
        source={`## 目次\n${source}`}
        plugins={[
          [
            remarkToc,
            {
              heading: '目次',
              maxDepth: 3,
            },
          ],
          remarkSectionize,
        ]}
        renderers={{
          code,
          heading,
          section,
          image,
        }}
      />
    </div>
  )
}

export default Markdown
