import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

const SiteNav = ({ ...restProps }: SiteNavProps): JSX.Element => {
  const SiteNav = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `
  const SiteNavLink = styled.a`
    display: block;
    padding: calc(1.5rem / 2);
  `

  return (
    <SiteNav {...restProps}>
      <Link href="/blog">
        <SiteNavLink>blog</SiteNavLink>
      </Link>
      <Link href="/books">
        <SiteNavLink>books</SiteNavLink>
      </Link>
      <Link href="/about">
        <SiteNavLink>about</SiteNavLink>
      </Link>
    </SiteNav>
  )
}

type SiteNavProps = {} & JSX.IntrinsicElements['div']

export default SiteNav
