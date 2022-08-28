import { ComponentProps, forwardRef } from "react";

import clsx from "clsx";

import { Link } from "../Link";
import styles from "./styles.module.css";

type Props = Readonly<ComponentProps<typeof Link>>;

export const LinkCard = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Link
      ref={ref}
      className={clsx(className, styles.root, styles.linkCard)}
      {...rest}
    />
  );
});
LinkCard.displayName = "LinkCard";
