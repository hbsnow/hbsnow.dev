import React from 'react'
import { css } from '@emotion/core'
import Main from '../partials/Main/Main'
import SiteTitle from '../partials/Header/SiteTitle'
import SiteNav from '../partials/Header/SiteNav'
import { LinkType } from '../../models/link'
import { containerSize } from '../../styles/const'
import Sns from '../partials/Footer/Sns'

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  children,
  subTitle,
  ...restProps
}) => {
  const containerStyles = css`
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
  `
  const gridStyles = css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(auto, ${containerSize['md']}) 5fr;
  `
  const siteTitleStyles = css`
    grid-column: 2 / 3;
  `
  const siteNavStyles = css`
    grid-column: 3 / 4;
  `
  const mainStyles = css`
    grid-column: 2 / 4;
  `
  const snsStyles = css`
    grid-column: 2 / 3;
  `
  const footerStyles = css`
    border-top: 1px solid var(--color-default-divider);
  `

  return (
    <div css={containerStyles} {...restProps}>
      <div css={[gridStyles]}>
        <SiteTitle css={siteTitleStyles} subTitle={subTitle} />
        <SiteNav css={siteNavStyles} />
      </div>
      <div css={[gridStyles]}>
        <Main css={mainStyles}>{children}</Main>
      </div>
      <div css={[gridStyles, footerStyles]}>
        <Sns css={snsStyles} />
      </div>
    </div>
  )
}

type DefaultTemplateProps = {
  subTitle?: LinkType
} & JSX.IntrinsicElements['div']

export default DefaultTemplate
