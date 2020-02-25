import React from 'react'
import styled from '@emotion/styled'
import { containerSize, mediaQuery } from '../../styles/const'

const Container: React.FC<ContainerProps> = ({ children, ...restProps }) => {
  const Container = styled('div')`
    display: grid;
    max-width: calc(${containerSize} - 1.5rem);
    grid-template-columns: repeat(8, 1fr);
    gap: 0 calc(1.5rem / 2);
    margin: 0 calc(1.5rem / 2);

    @media ${mediaQuery.md} {
      margin: 0 auto;
    }
  `

  return <Container {...restProps}>{children}</Container>
}

type ContainerProps = {} & JSX.IntrinsicElements['div']

export default Container
