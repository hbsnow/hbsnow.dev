import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

const SiteNav = ({ ...restProps }: SiteNavProps): JSX.Element => {
  const SiteNav = styled('div')`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `
  const SiteNavLink = styled('div')`
    display: block;
    padding: calc(1.5rem / 2);
  `

  return (
    <SiteNav {...restProps}>
      <SiteNavLink>
        <Link href="/blog">
          <a>blog</a>
        </Link>
      </SiteNavLink>
      <SiteNavLink>
        <Link href="/books">
          <a>books</a>
        </Link>
      </SiteNavLink>
    </SiteNav>
  )
}

type SiteNavProps = {} & JSX.IntrinsicElements['div']

export default SiteNav
