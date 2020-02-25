import React from 'react'
import { css } from '@emotion/core'
import ExternalLink from '../../atoms/link/ExternalLink'
import { ExternalLinkType } from '../../models/link'
import Icon from '../../atoms/icon/Icon'

const sns: ExternalLinkType[] = [
  {
    name: 'github',
    href: 'https://github.com/hbsnow',
  },
  {
    name: 'twitter',
    href: 'https://twitter.com/hbsnow',
  },
]

const Sns = ({ ...restProps }: SnsProps): JSX.Element => {
  const SnsStyles = css``

  return (
    <div role="list" css={SnsStyles} {...restProps}>
      {sns.map((item: ExternalLinkType) => (
        <div role="listitem" key={item.href}>
          <ExternalLink href={item.href}>
            <Icon name={item.name} />
          </ExternalLink>
        </div>
      ))}
    </div>
  )
}

type SnsProps = {} & JSX.IntrinsicElements['div']

export default Sns
