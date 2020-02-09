import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { LinkType } from '../../../models/link'

const SiteTitle = ({ subTitle, ...restProps }: SiteTitleProps): JSX.Element => {
  const siteTitleStyles = css`
    color: var(--color-primary-text);
    background-color: var(--color-primary-bg);
  `
  const Title = styled.h1`
    font-size: 1rem;
  `

  return (
    <header css={siteTitleStyles} {...restProps}>
      <Title>
        <Link href="/">
          <a>hbsnow.dev</a>
        </Link>
      </Title>
      {subTitle && <>{subTitle.name}</>}
    </header>
  )
}

type SiteTitleProps = {
  subTitle?: LinkType
} & JSX.IntrinsicElements['header']

export default SiteTitle
