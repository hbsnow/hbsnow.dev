import React from 'react'
import Container from '../../elements/container/Container'
import { mediaQuery } from '../../styles/const'
import Link from 'next/link'

const Header: React.FC<HeaderProps> = ({ ...restProps }) => {
  return (
    <header className="header" {...restProps}>
      <Container>
        <div className="grid">
          <div className="siteTitleContainer">
            <h1 className="siteTitle">
              <Link href="/">
                <a>hbsnow.dev</a>
              </Link>
            </h1>
          </div>

          <nav className="navContainer">
            <ul className="navList">
              <li className="navListItem">
                <Link href="/blog">
                  <a>blog</a>
                </Link>
              </li>
              <li className="navListItem">
                <Link href="/book">
                  <a>book</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
      <style jsx>{`
        .header {
          padding: calc(var(--gap-size) * 2) 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 0 var(--gap-size);
        }

        .siteTitleContainer {
          display: flex;
          align-items: center;
          grid-column: 1 / 9;
          grid-row: 1 / 2;
        }

        .navContainer {
          grid-column: 1 / 9;
          grid-row: 2 / 3;
        }

        .siteTitle {
          font-size: 1.5rem;
          margin: 0;
        }

        .navList {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 0;
        }

        .navListItem {
          display: block;
          margin: 0;
          padding: var(--gap-size);
        }

        @media ${mediaQuery.sm} {
          .siteTitleContainer {
            grid-column: 1 / 5;
            grid-row: 1 / 3;
          }

          .navContainer {
            grid-column: 5 / 9;
            grid-row: 1 / 3;
          }

          .header {
            padding: calc(var(--gap-size) * 6) 0;
          }
        }
      `}</style>
    </header>
  )
}

type HeaderProps = {} & JSX.IntrinsicElements['div']

export default Header
