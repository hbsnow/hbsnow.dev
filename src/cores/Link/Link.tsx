import { ComponentPropsWithoutRef, forwardRef } from "react";

import clsx from "clsx";

import { addRel } from "./addRel";
import styles from "./styles.module.css";

type Props = Readonly<
  Omit<ComponentPropsWithoutRef<"a">, "target"> & {
    external?: boolean;
  }
>;

export const Link = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { external, className, ...rest } = props;

  if (external) {
    const { rel, ...restExternal } = rest;

    return (
      <a
        ref={ref}
        target="_blank"
        className={clsx(className, styles.root)}
        rel={addRel(rel)}
        {...restExternal}
      />
    );
  }

  return <a ref={ref} className={clsx(className, styles.root)} {...rest} />;
});
Link.displayName = "Link";
