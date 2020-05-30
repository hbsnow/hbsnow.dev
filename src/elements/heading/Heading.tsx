import React, { FC, createElement, HTMLAttributes } from 'react'

import { slug } from 'github-slugger'
import { onlyText } from 'react-children-utilities'

type Props = {
  readonly level?: number
} & Omit<HTMLAttributes<HTMLHeadingElement>, 'className'>

const Heading: FC<Props> = ({ level = 1, children, ...restProps }) => {
  const text = onlyText(children)
  const id = slug(text)

  return createElement(
    `h${level}`,
    { id, ...restProps },
    <a href={`#${id}`} className="headingLink">
      {children}
      <style jsx>{`
        .headingLink {
          position: relative;
          display: inline-block;
          text-shadow: 0 0 3px var(--color-default-bg);
        }

        .headingLink::before {
          position: absolute;
          content: '#';
          top: 0;
          left: 0;
          transform: scale(3) translateX(calc(-1.5rem / 4));
          opacity: ${level >= 3 ? 0 : 0.1};
        }
      `}</style>
    </a>
  )
}

export default Heading
