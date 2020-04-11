import React, { createElement } from 'react'
import { onlyText } from 'react-children-utilities'
import { slug } from 'github-slugger'

type Props = {
  level?: number
} & React.HTMLAttributes<HTMLHeadingElement>

const Heading: React.FC<Props> = ({ level = 1, children, ...restProps }) => {
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
