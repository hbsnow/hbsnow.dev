import type { ComponentPropsWithoutRef } from "react";

import styles from "./styles.module.css";

type Props = Omit<ComponentPropsWithoutRef<"div">, "className">;

export const About = (props: Props): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <div className={styles.root} {...rest}>
      <div className={styles.avatar}>{children}</div>
    </div>
  );
};
