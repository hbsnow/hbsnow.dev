import type { PropsWithChildren, HTMLAttributes } from "react";
import { createElement } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";

export type Props = Readonly<
  PropsWithChildren<{
    level?: number;
  }> &
    HTMLAttributes<HTMLHeadingElement>
>;

export const Heading = (props: Props) => {
  const { level = 1, children, className, ...rest } = props;

  return createElement(
    `h${level}`,
    { className: clsx(styles.heading, className), ...rest },
    children,
  );
};
