import React from 'react'
import Link from 'next/link'
import Container from '../../elements/container/Container'
import ExternalLink from '../../elements/link/ExternalLink'
import { ExternalLinkType } from '../../models/link'
import Icon, { IconType } from '../../elements/icon/Icon'

const sns: ExternalLinkType<IconType>[] = [
  {
    name: 'github',
    href: 'https://github.com/hbsnow',
  },
  {
    name: 'twitter',
    href: 'https://twitter.com/hbsnow',
  },
]

const Footer = ({ ...restProps }: FooterProps): JSX.Element => {
  return (
    <footer className="footer" {...restProps}>
      <Container>
        <div className="footerContainer">
          <div className="siteName">
            <Link href="/">
              <a>hbsnow.dev</a>
            </Link>
          </div>

          <hr className="separator" />

          <ul className="snsList">
            {sns.map((item) => (
              <li className="snsListItem" key={item.href}>
                <div className="snsIcon">
                  <ExternalLink href={item.href}>
                    <Icon name={item.name} />
                  </ExternalLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <style jsx>{`
        .footerContainer {
          display: flex;
          height: calc(1.5rem * 6);
          justify-content: center;
          align-items: center;
        }

        .separator {
          width: 1px;
          height: 1.5rem;
          border-left: 1px solid var(--color-default-divider);
          margin: 0 1.5rem;
        }

        .snsList {
          display: flex;
          list-style: none;
          margin: 0;
        }

        .snsListItem {
          margin: 0;
        }

        .snsIcon {
          padding: calc(1.5rem / 2);
        }

        .siteName {
          padding: calc(1.5rem / 2);
        }
      `}</style>
    </footer>
  )
}

type FooterProps = {} & JSX.IntrinsicElements['footer']

export default Footer
