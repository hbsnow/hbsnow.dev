import React from 'react'
import styled from '@emotion/styled'
import { gapSize } from '../../styles/const'

const Grid: React.FC<GridProps> = ({ children, ...restProps }) => {
  const Grid = styled('div')`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0 ${gapSize};
  `

  return <Grid {...restProps}>{children}</Grid>
}

type GridProps = {} & JSX.IntrinsicElements['div']

export default Grid
