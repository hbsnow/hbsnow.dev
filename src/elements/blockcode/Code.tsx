import React from 'react'

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

export default Code
