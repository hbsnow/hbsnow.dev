import React from 'react'

import { containerSize } from '../../styles/const'

type Props = {} & JSX.IntrinsicElements['div']

const Container: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <div data-testid="Container" className="container" {...restProps}>
      <div className="inner">{children}</div>
      <style jsx>{`
        .container {
          display: flex;
          max-width: calc(${containerSize} - 1.5rem);
          margin: 0 auto;
          padding: 0 var(--gap-size);
        }

        .inner {
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default Container
