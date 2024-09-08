import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";
import { Container } from "@/cores/Container";
import { SystemIcon } from "@/cores/Icon";
import { Link } from "@/cores/Link";

type Props = ComponentPropsWithoutRef<"footer">;

export const Footer = (props: Props): JSX.Element => {
  const { className, ...rest } = props;

  return (
    <footer className={clsx(styles.root, className)} {...rest}>
      <Container>
        <div className={styles.container}>
          <div className={styles.sns}>
            <Link href="https://github.com/hbsnow" external>
              <SystemIcon name="github" aria-label="GitHub" />
            </Link>
            <Link href="https://x.com/hbsnow" external>
              <SystemIcon name="x" aria-label="X" />
            </Link>
          </div>

          <div className={styles.copyright}>© 2022 hbsnow</div>
        </div>
      </Container>
    </footer>
  );
};
