import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/core'

const SiteNav = ({ ...restProps }: SiteNavProps): JSX.Element => {
  const SiteNavStyles = css``

  return (
    <div css={SiteNavStyles} {...restProps}>
      <div>
        <Link href="/blog">
          <a>blog</a>
        </Link>
        <Link href="/books">
          <a>books</a>
        </Link>
        <Link href="/about">
          <a>about</a>
        </Link>
      </div>
    </div>
  )
}

type SiteNavProps = {} & JSX.IntrinsicElements['div']

export default SiteNav
