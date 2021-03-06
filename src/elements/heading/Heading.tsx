import React, { FC, createElement, HTMLAttributes } from "react";

import { slug } from "github-slugger";
import { onlyText } from "react-children-utilities";

export type Props = {
  level?: number;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className">;

const Heading: FC<Props> = ({ level = 1, children, ...rest }) => {
  const text = onlyText(children);
  const id = slug(text);

  return createElement(
    `h${level}`,
    { id, ...rest },
    <a href={`#${id}`} className="headingLink">
      {children}
      <style jsx>{`
        .headingLink {
          text-shadow: 0 0 3px var(--color-default-bg);
        }
      `}</style>
    </a>
  );
};

export default Heading;
