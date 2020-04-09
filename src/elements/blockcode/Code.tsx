import React from 'react'

const Code: React.FC = ({ children }) => {
  return (
    <code data-testid="Code" className="code">
      {children}
      <style jsx>{`
        .code {
          display: block;
        }
      `}</style>
    </code>
  )
}

export default Code
