import React from 'react'

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  children,
  ...restProps
}) => {
  return <div {...restProps}>{children}</div>
}

type DefaultTemplateProps = {} & JSX.IntrinsicElements['div']

export default DefaultTemplate
