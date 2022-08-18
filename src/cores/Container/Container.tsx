import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import styles from "./styles.module.css";

type Props = Readonly<
  PropsWithChildren<unknown> &
    Omit<ComponentPropsWithoutRef<"div">, "className">
>;

export const Container = (props: Props): JSX.Element => {
  return <div className={styles.container} {...props} />;
};
