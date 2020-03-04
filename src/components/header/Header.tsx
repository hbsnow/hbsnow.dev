import React from 'react'
import Container from '../../elements/container/Container'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import SiteTitle from './SiteTitle'
import SiteNav from './SiteNav'
import { mediaQuery } from '../../styles/const'
import Grid from '../../elements/grid/Grid'

const Header = ({ ...restProps }: HeaderProps): JSX.Element => {
  const Header = styled('header')`
    padding: 1.5rem 0;
    @media ${mediaQuery.sm} {
      padding: calc(1.5rem * 3) 0;
    }
  `
  const containerStyle = css`
    grid-template-rows: repeat(2, auto);
  `
  const siteTitleStyles = css`
    grid-column: 1 / 9;
    grid-row: 1 / 2;
    @media ${mediaQuery.sm} {
      grid-column: 1 / 5;
      grid-row: 1 / 3;
    }
  `
  const siteNavStyles = css`
    grid-column: 1 / 9;
    grid-row: 2 / 3;
    @media ${mediaQuery.sm} {
      grid-column: 5 / 9;
      grid-row: 1 / 3;
    }
  `

  return (
    <Header {...restProps}>
      <Container css={containerStyle}>
        <Grid>
          <SiteTitle css={siteTitleStyles} />
          <SiteNav css={siteNavStyles} />
        </Grid>
      </Container>
    </Header>
  )
}

type HeaderProps = {} & JSX.IntrinsicElements['header']

export default Header
