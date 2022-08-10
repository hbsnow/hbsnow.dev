import NextLink from "next/link";
import { ComponentsWithNodeOptions } from "rehype-react/lib";

import ExternalLink from "../link/ExternalLink";

export const Link: Required<ComponentsWithNodeOptions>["components"]["a"] = (
  props
): JSX.Element => {
  const { href, children } = props;
  if (!href) {
    throw new Error();
  }

  if (href.startsWith("/")) {
    return (
      <NextLink href={href}>
        <a>{children}</a>
      </NextLink>
    );
  }

  return <ExternalLink href={href}>{children}</ExternalLink>;
};
