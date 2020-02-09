import React from 'react'
import { css } from '@emotion/core'
import ExternalLink from '../../../components/ExternalLink/ExternalLink'

const Sns = ({ ...restProps }: SnsProps): JSX.Element => {
  const SnsStyles = css`
    color: var(--color-primary-text);
    background-color: var(--color-primary-bg);
  `

  return (
    <div css={SnsStyles} {...restProps}>
      <ExternalLink href="https://twitter.com/hbsnow">
        Twitter@hbsnow
      </ExternalLink>
    </div>
  )
}

type SnsProps = {} & JSX.IntrinsicElements['div']

export default Sns
