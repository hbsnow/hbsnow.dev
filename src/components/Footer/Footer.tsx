import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";

type Props = ComponentPropsWithoutRef<"footer">;

export const Footer = (props: Props): JSX.Element => {
  const { className, ...rest } = props;

  return (
    <footer className={clsx(className, styles.root)} {...rest}>
      © 2022 hbsnow
    </footer>
  );
};
