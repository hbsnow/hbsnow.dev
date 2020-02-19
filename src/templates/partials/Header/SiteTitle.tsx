import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { LinkType } from '../../../models/link'

const SiteTitle = ({ subTitle, ...restProps }: SiteTitleProps): JSX.Element => {
  const siteTitleStyles = css``
  const Title = styled.h1`
    font-size: 1rem;
  `

  return (
    <div css={siteTitleStyles} {...restProps}>
      <Title>
        <Link href="/">
          <a>hbsnow.dev</a>
        </Link>
      </Title>
      {subTitle && <>{subTitle.name}</>}
    </div>
  )
}

type SiteTitleProps = {
  subTitle?: LinkType
} & JSX.IntrinsicElements['div']

export default SiteTitle
