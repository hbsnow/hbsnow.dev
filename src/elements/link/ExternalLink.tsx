import React, { FC } from 'react'

type NoTargetElement = Omit<JSX.IntrinsicElements['a'], 'target' | 'className'>

type Props = {
  readonly disableVisited?: boolean
} & NoTargetElement

const addRel = (props: NoTargetElement): NoTargetElement => {
  const rel = props?.rel?.split(' ') || []
  rel.push(...['noopener', 'noreferrer'])

  return {
    ...props,
    rel: Array.from(new Set(rel)).join(' '),
  }
}

const ExternalLink: FC<Props> = ({
  children,
  disableVisited = false,
  ...restProps
}) => {
  return (
    <a target="_blank" className="link" {...addRel(restProps)}>
      {children}
      <style jsx>{`
        .link {
          ${disableVisited ? `color: var(--color-primary)` : ''}
        }
      `}</style>
    </a>
  )
}

export default ExternalLink
