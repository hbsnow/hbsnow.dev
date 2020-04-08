import React from 'react'
import Avatar from './Avatar'

type Props = {}

const HomeAbout: React.FC<Props> = ({ children }) => {
  return (
    <div className="homeAbout">
      <div className="avatarCell">
        <Avatar />
      </div>
      <div className="descriptionCell">
        <div className="description">{children}</div>
      </div>

      <style jsx>{`
        .homeAbout {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: calc(var(--gap-size) * 4);
        }

        .avatarCell {
          grid-column: 1 / 2;
        }

        .descriptionCell {
          grid-column: 2 / 3;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .description {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default HomeAbout
