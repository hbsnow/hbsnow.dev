import React from 'react'
import styled from '@emotion/styled'
import { containerSize, mediaQuery, gapSize } from '../../styles/const'

const Container: React.FC<ContainerProps> = ({ children, ...restProps }) => {
  const Container = styled('div')`
    max-width: calc(${containerSize} - 1.5rem);
    margin: 0 ${gapSize};

    @media ${mediaQuery.md} {
      margin: 0 auto;
    }
  `

  return <Container {...restProps}>{children}</Container>
}

type ContainerProps = {} & JSX.IntrinsicElements['div']

export default Container
