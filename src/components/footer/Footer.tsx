import { Container } from "../../cores/Container";
import { Icon } from "../../cores/Icon";
import { Link } from "../../cores/Link";
import styles from "./styles.module.css";

const sns = [
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
] as const;

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContainer}>
          <div className={styles.siteName}>
            <Link href="/">hbsnow.dev</Link>
          </div>

          <hr className={styles.separator} />

          <div role="list" className={styles.snsList}>
            {sns.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                external
              >
                <Icon name={item.name} />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
