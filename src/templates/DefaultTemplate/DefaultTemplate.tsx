import React from 'react'
import { css, SerializedStyles } from '@emotion/core'
import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'
import Main from '../partials/Main/Main'
import SubTitle, { Title } from '../partials/Header/SubTitle'

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  children,
  styles,
  subTitle,
}) => {
  const containerCss = css`
    min-height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    row-gap: 1rem;
  `
  const headerCss = css`
    grid-row: 1 / 2;
  `
  const mainCss = css`
    grid-row: 2 / 3;
  `
  const footerCss = css`
    grid-row: 3 / 4;
  `

  return (
    <div css={[containerCss, styles]}>
      <Header css={headerCss}>
        {subTitle?.name && <SubTitle title={subTitle} />}
      </Header>
      <Main css={mainCss}>{children}</Main>
      <Footer css={footerCss} />
    </div>
  )
}

type DefaultTemplateProps = {
  styles?: SerializedStyles
  subTitle?: Title
}

export default DefaultTemplate
