import React from 'react'
import { css } from '@emotion/core'
import SiteTitle from '../partials/Header/SiteTitle'
import SiteNav from '../partials/Header/SiteNav'
import { LinkType } from '../../models/link'
import Sns from '../partials/Footer/Sns'
import Container from '../../components/Container/Container'

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  children,
  subTitle,
  ...restProps
}) => {
  const containerStyles = css`
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
  `
  const siteTitleStyles = css`
    grid-column: 1 / 3;
  `
  const siteNavStyles = css`
    grid-column: 3 / 9;
  `
  const snsStyles = css`
    grid-column: 1 / 5;
  `
  const footerStyles = css`
    border-top: 1px solid var(--color-default-divider);
    padding: calc(1.5rem / 2) 0;
  `

  return (
    <div css={containerStyles} {...restProps}>
      <header>
        <Container>
          <SiteTitle css={siteTitleStyles} subTitle={subTitle} />
          <SiteNav css={siteNavStyles} />
        </Container>
      </header>

      <main>{children}</main>

      <footer css={footerStyles}>
        <Container>
          <Sns css={snsStyles} />
        </Container>
      </footer>
    </div>
  )
}

type DefaultTemplateProps = {
  subTitle?: LinkType
} & JSX.IntrinsicElements['div']

export default DefaultTemplate
