import React from 'react'
import { containerSize } from '../../styles/const'

type Props = {} & JSX.IntrinsicElements['div']

const Container: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <div data-testid="Container" className="container" {...restProps}>
      {children}
      <style jsx>{`
        .container {
          max-width: calc(${containerSize} - 1.5rem);
          margin: 0 auto;
          padding: 0 var(--gap-size);
        }
      `}</style>
    </div>
  )
}

export default Container
