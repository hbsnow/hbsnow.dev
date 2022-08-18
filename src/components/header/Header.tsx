import { Container } from "../../cores/Container";
import { Heading } from "../../cores/Heading";
import { Link } from "../../cores/Link";
import styles from "./styles.module.css";

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.flex}>
          <Heading level={1} className={styles.heading}>
            <Link href="/">hbsnow.dev</Link>
          </Heading>

          <nav>
            <ul className={styles.navList}>
              <li>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/blog/">blog</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};
