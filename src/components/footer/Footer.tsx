import React from 'react'
import Link from 'next/link'
import Container from '../../elements/container/Container'
import ExternalLink from '../../elements/link/ExternalLink'
import { ExternalLinkType } from '../../models/link'
import Icon, { IconType } from '../../elements/icon/Icon'

type SnsLink = {
  label: string
} & ExternalLinkType<IconType>

const sns: SnsLink[] = [
  {
    name: 'github',
    label: 'GitHub',
    href: 'https://github.com/hbsnow',
  },
  {
    name: 'twitter',
    label: 'Twitter',
    href: 'https://twitter.com/hbsnow',
  },
]

const Footer: React.FC<FooterProps> = ({ ...restProps }) => {
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
                  <ExternalLink href={item.href} aria-label={item.label}>
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
          margin: 0 calc(var(--gap-size) * 2);
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
          padding: var(--gap-size);
        }

        .siteName {
          padding: var(--gap-size);
        }
      `}</style>
    </footer>
  )
}

type FooterProps = {} & JSX.IntrinsicElements['footer']

export default Footer
