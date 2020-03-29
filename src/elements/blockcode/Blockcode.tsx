import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { styles } from './styles'

const Pre: React.FC = ({ children }) => {
  return (
    <pre className="hljs">
      {children}
      <style jsx>{`
        .hljs {
          margin: 0;
        }
      `}</style>
      <style jsx global>
        {styles}
      </style>
    </pre>
  )
}

const Code: React.FC = ({ children }) => {
  return (
    <code className="code">
      {children}
      <style jsx>{`
        .code {
          display: block;
        }
      `}</style>
    </code>
  )
}

const Blockcode: React.FC<BlockcodeProps> = ({
  children,
  language,
  ...restProps
}) => {
  return (
    <div data-testid="Blockcode" className="blockcode" {...restProps}>
      <p>{language}</p>
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
        }
      `}</style>
    </div>
  )
}

type BlockcodeProps = {
  language?: string
} & JSX.IntrinsicElements['div']

export default Blockcode
