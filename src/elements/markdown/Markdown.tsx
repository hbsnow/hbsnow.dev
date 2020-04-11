import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkSectionize from 'remark-sectionize'
import Blockcode from '../blockcode/Blockcode'
import Heading from '../heading/Heading'
import { imageSize } from 'image-size'

type Props = {
  source: string
} & JSX.IntrinsicElements['div']

const Markdown: React.FC<Props> = ({ source, ...restProps }) => {
  const code = ({ language, value }): JSX.Element => {
    return <Blockcode language={language}>{value}</Blockcode>
  }

  const section = ({ children }): JSX.Element => {
    return <section>{children}</section>
  }

  const heading = ({ level, children, ...rest }): JSX.Element => {
    return (
      <Heading level={parseInt(level)} {...rest}>
        {children}
      </Heading>
    )
  }

  const image = ({ src, alt }): JSX.Element => {
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
