import React from 'react'
import { css } from '@emotion/core'
import ExternalLink from '../../atoms/link/ExternalLink'
import { ExternalLinkType } from '../../models/link'

const sns: SnsExternalLinkType[] = [
  {
    icon: null,
    name: 'GitHub',
    href: 'https://github.com/hbsnow',
  },
  {
    icon: null,
    name: 'Twitter',
    href: 'https://twitter.com/hbsnow',
  },
  {
    icon: null,
    name: 'Facebook',
    href: 'https://www.facebook.com/hb.yuki',
  },
  {
    icon: null,
    name: 'Qiita',
    href: 'https://qiita.com/hbsnow',
  },
]

const Sns = ({ ...restProps }: SnsProps): JSX.Element => {
  const SnsStyles = css``

  return (
    <div role="list" css={SnsStyles} {...restProps}>
      {sns.map((item: SnsExternalLinkType) => (
        <div role="listitem" key={item.href}>
          <ExternalLink href={item.href}>{item.name}</ExternalLink>
        </div>
      ))}
    </div>
  )
}

type SnsExternalLinkType = { icon: JSX.Element } & ExternalLinkType

type SnsProps = {} & JSX.IntrinsicElements['div']

export default Sns
