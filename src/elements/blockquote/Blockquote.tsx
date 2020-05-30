import React, { FC } from 'react'

import Icon from '../icon/Icon'

type Props = JSX.IntrinsicElements['div']

const Blockquote: FC<Props> = ({ children, ...restProps }) => {
  return (
    <div data-testid="Blockquote" className="blockquote" {...restProps}>
      <div className="icon">
        <Icon name="quote" />
      </div>
      {children}
      <style jsx>{`
        .icon {
          margin-bottom: 0.375rem;
          opacity: 0.5;
        }

        .blockquote {
          background-color: var(--color-default-surface);
          margin-left: calc(var(--gap-size) * -2);
          margin-right: calc(var(--gap-size) * -2);
          margin-bottom: calc(var(--gap-size) * 2);
          padding: calc(var(--gap-size) * 1.5) calc(var(--gap-size) * 2)
            calc(var(--gap-size) * 0.5);
        }
      `}</style>
    </div>
  )
}

export default Blockquote
