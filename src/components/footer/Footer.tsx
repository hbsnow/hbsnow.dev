import React from "react";

import Link from "next/link";

import Container from "../../elements/container/Container";
import Icon, { IconType } from "../../elements/icon/Icon";
import ExternalLink from "../../elements/link/ExternalLink";
import { ExternalLinkType } from "../../models/link";

type SnsLink = Readonly<
  {
    label: string;
  } & ExternalLinkType<IconType>
>;

const sns: Readonly<SnsLink[]> = [
  {
    name: "github",
    label: "GitHub",
    href: "https://github.com/hbsnow",
  },
  {
    name: "twitter",
    label: "Twitter",
    href: "https://twitter.com/hbsnow",
  },
];

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <Container>
        <div className="footerContainer">
          <div className="siteName">
            <Link href="/">
              <a className="link">hbsnow.dev</a>
            </Link>
          </div>

          <hr className="separator" />

          <ul className="snsList">
            {sns.map((item) => (
              <li className="snsListItem" key={item.href}>
                <div className="snsIcon">
                  <ExternalLink
                    href={item.href}
                    aria-label={item.label}
                    disableVisited
                  >
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
        }
        .footer::before {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          content: "";
          z-index: -1;
          background-color: var(--color-default-bg);
          opacity: 0.6;
        }

        .footerContainer {
          display: flex;
          height: calc(1.5rem * 12);
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

        .link {
          color: var(--color-primary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
