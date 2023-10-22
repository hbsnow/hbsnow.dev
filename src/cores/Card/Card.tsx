import { type ComponentPropsWithoutRef, forwardRef } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";

type Props = Readonly<
  ComponentPropsWithoutRef<"div"> & {
    external?: boolean;
  }
>;

export const Card = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...rest } = props;

  return <div ref={ref} className={clsx(className, styles.root)} {...rest} />;
});
Card.displayName = "Card";
