import React from 'react'
import ExternalLink from '../../elements/link/ExternalLink'
import { ExternalLinkType } from '../../models/link'
import Icon, { IconType } from '../../elements/icon/Icon'

const sns: ExternalLinkType<IconType>[] = [
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
  return (
    <div {...restProps}>
      <ul>
        {sns.map((item) => (
          <li role="listitem" key={item.href}>
            <ExternalLink href={item.href}>
              <Icon name={item.name} />
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

type SnsProps = {} & JSX.IntrinsicElements['div']

export default Sns
