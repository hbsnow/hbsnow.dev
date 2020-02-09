import React from 'react'
import { css } from '@emotion/core'
import Main from '../partials/Main/Main'
import SiteTitle from '../partials/Header/SiteTitle'
import SiteNav from '../partials/Header/SiteNav'
import { LinkType } from '../../models/link'
import Footer from '../partials/Footer/Footer'
import { containerSize } from '../../styles/const'

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  children,
  subTitle,
  ...restProps
}) => {
  const containerStyles = css`
    min-height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(auto, ${containerSize['md']}) 5fr;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
  `
  const siteTitleStyles = css`
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  `
  const siteNavStyles = css`
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  `
  const mainStyles = css`
    grid-row: 2 / 3;
    grid-column: 2 / 4;
  `
  const footerStyles = css`
    grid-row: 3 / 4;
    grid-column: 2 / 3;
  `

  return (
    <div css={containerStyles} {...restProps}>
      <SiteTitle subTitle={subTitle} css={siteTitleStyles} />
      <SiteNav css={siteNavStyles} />
      <Main css={mainStyles}>{children}</Main>
      <Footer css={footerStyles} />
    </div>
  )
}

type DefaultTemplateProps = {
  subTitle?: LinkType
} & JSX.IntrinsicElements['div']

export default DefaultTemplate
