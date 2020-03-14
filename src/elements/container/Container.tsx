import React from 'react'
import { containerSize, gapSize } from '../../styles/const'

const Container: React.FC<ContainerProps> = ({ children, ...restProps }) => {
  return (
    <div className="container" {...restProps}>
      {children}
      <style jsx>{`
        .container {
          max-width: calc(${containerSize} - 1.5rem);
          margin: 0 auto;
          padding: 0 ${gapSize};
        }
      `}</style>
    </div>
  )
}

type ContainerProps = {} & JSX.IntrinsicElements['div']

export default Container
