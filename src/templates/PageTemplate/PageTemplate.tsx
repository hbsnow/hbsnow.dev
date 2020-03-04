import React from 'react'
import styled from '@emotion/styled'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  ...restProps
}) => {
  const PageTemplate = styled('div')`
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
  `

  return (
    <PageTemplate {...restProps}>
      <Header />
      <main>{children}</main>
      <Footer />
    </PageTemplate>
  )
}

type PageTemplateProps = {} & JSX.IntrinsicElements['div']

export default PageTemplate
