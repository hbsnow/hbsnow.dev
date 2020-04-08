import React from 'react'
import Link, { LinkProps } from 'next/link'

type Props = {} & LinkProps

const UnderlineLink: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <Link {...restProps}>
      <a className="link">
        {children}
        <style jsx>{`
          .link {
            position: relative;
            padding: var(--gap-size) calc(var(--gap-size) * 4);
          }
          .link::before,
          .link::after {
            content: '';
            position: absolute;
            top: 0;
            left: calc(var(--gap-size) * -10);
            right: calc(var(--gap-size) * -10);
            bottom: 0;
            z-index: -1;
          }
          .link::before {
            background-image: linear-gradient(
              to right,
              transparent 0%,
              var(--color-default-surface) 50%,
              transparent 100%
            );
            transform: skew(0, var(--layout-deg));
          }
          .link::after {
            background-color: var(--color-default-bg);
            opacity: 0.6;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default UnderlineLink
