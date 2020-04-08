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

type Props = {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="footer">
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
        .footer {
          position: relative;
          margin: calc(var(--gap-size) * 6) 0;
        }
        .footer::before,
        .footer::after {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          content: '';
          z-index: -1;
        }

        .footer::before {
          transform: skew(0, var(--layout-deg));
          background-color: var(--color-default-surface);
        }
        .footer::after {
          background-color: var(--color-default-bg);
          opacity: 0.6;
        }

        .footerContainer {
          display: flex;
          height: calc(1.5rem * 16);
          justify-content: center;
          align-items: center;
        }

        .separator {
          width: 1px;
          height: 1.5rem;
          border: 0;
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

export default Footer
