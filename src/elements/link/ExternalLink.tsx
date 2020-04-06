import React from 'react'

type NoTargetElement = Omit<JSX.IntrinsicElements['a'], 'target'>

type Props = {} & NoTargetElement

const addRel = (props: NoTargetElement): NoTargetElement => {
  const rel = props?.rel?.split(' ') || []
  rel.push(...['noopener', 'noreferrer'])

  return {
    ...props,
    rel: Array.from(new Set(rel)).join(' '),
  }
}

const ExternalLink: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <a target="_blank" {...addRel(restProps)}>
      {children}
    </a>
  )
}

export default ExternalLink
