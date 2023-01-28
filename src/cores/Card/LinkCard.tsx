import { ComponentProps, forwardRef } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";
import { Link } from "@/cores/Link";

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
