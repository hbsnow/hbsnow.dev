import React from 'react'

import { imageSize } from 'image-size'
import ReactMarkdown from 'react-markdown'
import remarkSectionize from 'remark-sectionize'

import Blockcode from '../blockcode/Blockcode'
import Heading from '../heading/Heading'

type Props = {
  source: string
} & JSX.IntrinsicElements['div']

const Markdown: React.FC<Props> = ({ source, ...restProps }) => {
  const code: React.FC<{ language: string; value: string }> = ({
    language,
    value,
  }) => {
    return <Blockcode language={language}>{value}</Blockcode>
  }

  const section: React.FC = ({ children }) => {
    return <section>{children}</section>
  }

  const heading: React.FC<{ level: string }> = ({ level, children }) => {
    return <Heading level={parseInt(level)}>{children}</Heading>
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
        source={source}
        plugins={[remarkSectionize]}
        renderers={{
          code,
          section,
          heading,
          image,
        }}
      />
    </div>
  )
}

export default Markdown
