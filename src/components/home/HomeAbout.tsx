import React from 'react'
import Avatar from './Avatar'
import { mediaQuery } from '../../styles/const'

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
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          gap: calc(var(--gap-size) * 4);
        }

        .avatarCell,
        .descriptionCell {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .avatarCell {
          grid-row: 1 / 2;
        }

        .descriptionCell {
          grid-row: 2 / 3;
        }

        .description {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media ${mediaQuery.sm} {
          .homeAbout {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto;
          }

          .avatarCell {
            grid-column: 1 / 2;
          }

          .descriptionCell {
            grid-row: 1 / 2;
            grid-column: 2 / 3;
          }
        }
      `}</style>
    </div>
  )
}

export default HomeAbout
