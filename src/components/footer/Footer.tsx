import React from 'react'
import Container from '../../elements/container/Container'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Sns from '../../components/footer/Sns'

const Footer = ({ ...restProps }: FooterProps): JSX.Element => {
  const snsStyles = css`
    grid-column: 1 / 5;
  `
  const Footer = styled('footer')`
    border-top: 1px solid var(--color-default-divider);
    padding: calc(1.5rem / 2) 0;
  `

  return (
    <Footer {...restProps}>
      <Container>
        <Sns css={snsStyles} />
      </Container>
    </Footer>
  )
}

type FooterProps = {} & JSX.IntrinsicElements['header']

export default Footer
