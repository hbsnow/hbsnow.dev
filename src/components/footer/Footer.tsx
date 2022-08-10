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
    </footer>
  );
};

export default Footer;
