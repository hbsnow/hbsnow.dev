import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { addRel } from "./addRel";

type Props = Readonly<
  Omit<ComponentPropsWithoutRef<"a">, "target"> & {
    external?: boolean;
  }
>;

export const Link = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { external, ...rest } = props;

  if (external) {
    const { rel, ...restExternal } = rest;

    return <a ref={ref} target="_blank" rel={addRel(rel)} {...restExternal} />;
  }

  return <a ref={ref} {...rest} />;
});
Link.displayName = "Link";
