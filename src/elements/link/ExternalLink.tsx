import React from 'react'

const addRel = (props: NoTargetElement): NoTargetElement => {
  const rel = props?.rel?.split(' ') || []
  rel.push(...['noopener', 'noreferrer'])

  return {
    ...props,
    rel: Array.from(new Set(rel)).join(' '),
  }
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  ...restProps
}) => {
  return (
    <a target="_blank" {...addRel(restProps)}>
      {children}
    </a>
  )
}

type NoTargetElement = Omit<JSX.IntrinsicElements['a'], 'target'>

type ExternalLinkProps = {} & NoTargetElement

export default ExternalLink
