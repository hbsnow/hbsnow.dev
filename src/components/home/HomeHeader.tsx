import React from 'react'

type Props = {
  title: string
}

const HomeHeader: React.FC<Props> = ({ title, children }) => {
  return (
    <header className="header">
      <h2 className="title">{title}</h2>
      <div className="content">{children}</div>
      <style jsx>{`
        .section {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
        }
      `}</style>
    </header>
  )
}

export default HomeHeader
