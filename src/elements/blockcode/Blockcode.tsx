import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Pre from './Pre'
import Code from './Code'

const Blockcode: React.FC<BlockcodeProps> = ({
  children,
  language,
  ...restProps
}) => {
  return (
    <div data-testid="Blockcode" className="blockcode" {...restProps}>
      {language && <div className="language">{language}</div>}
      <SyntaxHighlighter
        language={language}
        style={false}
        PreTag={Pre}
        CodeTag={Code}
      >
        {children}
      </SyntaxHighlighter>
      <style jsx>{`
        .blockcode {
          background-color: var(--color-default-surface);
          margin-left: calc(var(--gap-size) * -2);
          margin-right: calc(var(--gap-size) * -2);
          margin-bottom: calc(var(--gap-size) * 2);
          padding: calc(var(--gap-size) * 1.5) calc(var(--gap-size) * 2);
          ${language && `padding-top: 0; `}
        }

        .language {
          display: inline-block;
          vertical-align: middle;
          background-color: rgba(0, 0, 0, 0.05);
          font-family: var(--font-family-code);
          font-size: 0.75rem;
          margin-bottom: var(--gap-size);
          padding: 0.125rem 0.5rem;
          transform: translateX(-0.5rem);
        }
      `}</style>
    </div>
  )
}

type BlockcodeProps = {
  language?: string
} & JSX.IntrinsicElements['div']

export default Blockcode
