import { ComponentProps, Fragment } from "react";

import { Container } from "../../cores/Container";
import { Heading } from "../../cores/Heading";
import { Link } from "../../cores/Link";
import styles from "./styles.module.css";

type Props = {
  paths?: {
    name: string;
    href?: ComponentProps<typeof Link>["href"];
  }[];
};

export const Header = (props: Props): JSX.Element => {
  const { paths = [] } = props;

  return (
    <header className={styles.root}>
      <Container>
        <Heading level={1} className={styles.heading}>
          <Link href="/">hbsnow.dev</Link>

          {paths.map(({ name, href }) => {
            return (
              <Fragment key={name}>
                <span className={styles.slash}>/</span>
                {href ? (
                  <Link href={href} className={styles.pathname}>
                    {name}
                  </Link>
                ) : (
                  <span className={styles.pathname}>{name}</span>
                )}
              </Fragment>
            );
          })}
        </Heading>
      </Container>
    </header>
  );
};
