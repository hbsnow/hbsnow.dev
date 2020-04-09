import React from 'react'

type Props = {} & JSX.IntrinsicElements['div']

const Accent: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <div data-testid="Accent" className="accent" {...restProps}>
      {children}
      <style jsx>{`
        .accent {
          position: relative;
          padding: var(--gap-size) calc(var(--gap-size) * 4);
        }
        .accent::before,
        .accent::after {
          content: '';
          position: absolute;
          top: 0;
          left: calc(var(--gap-size) * -10);
          right: calc(var(--gap-size) * -10);
          bottom: 0;
          z-index: -1;
        }
        .accent::before {
          background-image: linear-gradient(
            to right,
            transparent 0%,
            var(--color-default-surface) 50%,
            transparent 100%
          );
          transform: skew(0, var(--layout-deg));
        }
        .accent::after {
          background-color: var(--color-default-bg);
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}

export default Accent
