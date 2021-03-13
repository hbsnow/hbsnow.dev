import React, { PropsWithChildren } from "react";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

type Props = PropsWithChildren<unknown>;

const DefaultTemplate = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <div className="root">
      <div className="header">
        <Header />
      </div>
      <main>{children}</main>
      <div className="footer">
        <Footer />
      </div>
      <style jsx>{`
        .root {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .root::before {
          position: absolute;
          height: calc(var(--gap-size) * 12 + calc(1.5rem * 12));
          bottom: 0;
          right: 0;
          left: 0;
          content: "";
          z-index: -1;
          background-color: var(--color-default-surface);
          transform: skew(0, var(--layout-deg));
          transform-origin: bottom left;
        }

        .footer {
          margin: 0 0 calc(var(--gap-size) * 6);
        }
      `}</style>
    </div>
  );
};

export default DefaultTemplate;
