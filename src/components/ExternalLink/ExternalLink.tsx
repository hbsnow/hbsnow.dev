import { SerializedStyles } from '@emotion/core'

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
  styles,
  ...restProps
}) => {
  return (
    <a css={styles} target="_blank" {...addRel(restProps)}>
      {children}
    </a>
  )
}

type NoTargetElement = Omit<JSX.IntrinsicElements['a'], 'target'>

type ExternalLinkProps = {
  styles?: SerializedStyles
} & NoTargetElement

export default ExternalLink
