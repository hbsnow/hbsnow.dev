import React from "react";

import Link from "next/link";

import Container from "../../elements/container/Container";
import { mediaQuery } from "../../styles/const";

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <Container>
        <div className="grid">
          <div className="siteTitleContainer">
            <h1 className="siteTitle">
              <Link href="/">
                <a className="link">hbsnow.dev</a>
              </Link>
            </h1>
          </div>

          <nav className="navContainer">
            <ul className="navList">
              <li className="navListItem">
                <Link href="/blog/">
                  <a className="link">blog</a>
                </Link>
              </li>
              <li className="navListItem">
                <Link href="/book/">
                  <a className="link">book</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
