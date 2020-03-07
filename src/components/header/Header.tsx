import React from 'react'
// import classNames from 'classnames'
import Container from '../../elements/container/Container'
import SiteTitle from './SiteTitle'
import SiteNav from './SiteNav'
import { mediaQuery } from '../../styles/const'
import Grid from '../../elements/grid/Grid'

const Header = ({ ...restProps }: HeaderProps): JSX.Element => {
  // const containerStyle = css`
  //   grid-template-rows: repeat(2, auto);
  // `
  // const siteTitleStyles = css`
  //   grid-column: 1 / 9;
  //   grid-row: 1 / 2;
  //   @media ${mediaQuery.sm} {
  //     grid-column: 1 / 5;
  //     grid-row: 1 / 3;
  //   }
  // `
  // const siteNavStyles = css`
  //   grid-column: 1 / 9;
  //   grid-row: 2 / 3;
  //   @media ${mediaQuery.sm} {
  //     grid-column: 5 / 9;
  //     grid-row: 1 / 3;
  //   }
  // `

  return (
    <div {...restProps}>
      <header className="header">
        <Container>
          <Grid>
            <SiteTitle />
            <SiteNav />
          </Grid>
        </Container>
        <style jsx>{`
          .header {
            padding: 1.5rem 0;
          }
          @media ${mediaQuery.sm} {
            .header {
              padding: calc(1.5rem * 3) 0;
            }
          }
        `}</style>
      </header>{' '}
    </div>
  )
}

type HeaderProps = {} & JSX.IntrinsicElements['div']

export default Header
