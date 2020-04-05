import React from 'react'
import Link, { LinkProps } from 'next/link'
import Icon, { TagType, TagList } from '../icon/Icon'
import { textColor } from '../../styles/mixin'

const Chip: React.FC<ChipProps> = ({ children, icon, ...restProps }) => {
  return (
    <Link {...restProps}>
      <a className="chip">
        {icon ? (
          <span className="icon">
            <Icon name={icon} width={14} height={14} />
          </span>
        ) : (
          <span className="spacer"></span>
        )}
        <span className="name">{children}</span>
        <span className="spacer"></span>
        <style jsx>{`
          .chip {
            display: inline-flex;
            height: calc(1rem + var(--gap-size));
            justify-content: center;
            align-items: center;
            font-size: 0.75rem;
            background-color: var(--color-default-surface);
            border-radius: calc(1rem + var(--gap-size));
            vertical-align: middle;
            color: inherit;
          }

          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(1rem + var(--gap-size) - 4px);
            height: calc(1rem + var(--gap-size) - 4px);
            border-radius: 50%;
            margin: 0 calc(var(--gap-size) / 2) 0 2px;
            ${icon
              ? `
                color: ${textColor(TagList[icon])};
                background-color: ${TagList[icon]};
              `
              : ''}
          }

          .spacer {
            width: var(--gap-size);
          }
        `}</style>
      </a>
    </Link>
  )
}

type ChipProps = {
  icon?: TagType
} & LinkProps

export default Chip
