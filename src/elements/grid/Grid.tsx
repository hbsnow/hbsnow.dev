import React from 'react'
import { gapSize } from '../../styles/const'

const Grid: React.FC<GridProps> = ({ children, ...restProps }) => {
  return (
    <div {...restProps}>
      <div className="grid">{children}</div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 0 ${gapSize};
        }
      `}</style>
    </div>
  )
}

type GridProps = {} & JSX.IntrinsicElements['div']

export default Grid
