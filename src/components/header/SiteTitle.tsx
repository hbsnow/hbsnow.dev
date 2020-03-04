import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

const SiteTitle = ({ ...restProps }: SiteTitleProps): JSX.Element => {
  const SiteTitle = styled('h1')`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  `
  const Title = styled('div')`
    color: inherit;
  `

  return (
    <SiteTitle {...restProps}>
      <Link href="/">
        <a>
          <Title>hbsnow.dev</Title>
        </a>
      </Link>
    </SiteTitle>
  )
}

type SiteTitleProps = {} & JSX.IntrinsicElements['div']

export default SiteTitle
