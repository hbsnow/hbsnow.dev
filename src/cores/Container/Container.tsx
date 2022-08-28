import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";

type Props = Readonly<
  PropsWithChildren<unknown> & ComponentPropsWithoutRef<"div">
>;

export const Container = (props: Props): JSX.Element => {
  const { className, ...rest } = props;

  return <div className={clsx(className, styles.root)} {...rest} />;
};
